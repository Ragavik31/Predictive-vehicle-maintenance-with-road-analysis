from pathlib import Path
from typing import Annotated

import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

try:
    import shap
except ImportError:
    shap = None

try:
    from backend.mongodb import (
        init_database,
        check_connection_status,
        get_fleet_vehicles,
        get_fleet_summary,
        get_fleet_stats,
        get_routes,
        get_top_case_vehicle,
        get_top_high_risk_vehicles,
        log_diagnostic_scan,
        get_recent_scans,
    )
except ImportError:
    from mongodb import (
        init_database,
        check_connection_status,
        get_fleet_vehicles,
        get_fleet_summary,
        get_fleet_stats,
        get_routes,
        get_top_case_vehicle,
        get_top_high_risk_vehicles,
        log_diagnostic_scan,
        get_recent_scans,
    )


MODEL_PATH = Path(__file__).resolve().parent.parent / "Model" / "models" / "voting_ensemble_model.pkl"
FALLBACK_MODEL_PATH = Path(__file__).resolve().parent.parent / "Model" / "models" / "best_model_smote.pkl"
BACKGROUND_PATH = Path(__file__).resolve().parent.parent / "Model" / "data" / "processed" / "test_dataset.csv"

FEATURE_NAMES = [
    "Make_and_Model",
    "Vehicle_Type",
    "Year_of_Manufacture",
    "Road_Conditions",
    "Weather_Conditions",
    "Route_Info",
    "Usage_Hours",
    "Load_Capacity",
    "Actual_Load",
    "Engine_Temperature",
    "Fuel_Consumption",
    "Battery_Status",
    "Oil_Quality",
    "Vibration_Levels",
    "Tire_Pressure",
    "Failure_History",
    "Anomalies_Detected",
    "Diagnostic_Trouble_Code_Count",
    "CAN_Message_Rate_Hz",
    "Sensor_Packet_Loss_Rate",
]


class PredictionRequest(BaseModel):
    makeAndModel: Annotated[float, Field(ge=0, le=10)]
    vehicleType: Annotated[float, Field(ge=0, le=10)]
    yearOfManufacture: Annotated[float, Field(ge=1900, le=2100)]
    roadConditions: Annotated[float, Field(ge=0, le=10)]
    weatherConditions: Annotated[float, Field(ge=0, le=10)]
    routeInfo: Annotated[float, Field(ge=0, le=10)]
    usageHours: Annotated[float, Field(ge=0, le=30000)]
    loadCapacity: Annotated[float, Field(ge=0, le=30000)]
    actualLoad: Annotated[float, Field(ge=0, le=30000)]
    engineTemp: Annotated[float, Field(ge=60, le=120)]
    fuelConsumption: Annotated[float, Field(ge=0, le=20)]
    batteryStatus: Annotated[float, Field(ge=0, le=120)]
    oilQuality: Annotated[float, Field(ge=0, le=120)]
    vibration: Annotated[float, Field(ge=0, le=8)]
    tirePressure: Annotated[float, Field(ge=0, le=80)]
    failureHistory: Annotated[float, Field(ge=0, le=10)]
    anomaliesDetected: Annotated[float, Field(ge=0, le=10)]
    diagnosticTroubleCodeCount: Annotated[float, Field(ge=0, le=10)]
    canMessageRateHz: Annotated[float, Field(ge=0, le=100)]
    sensorPacketLossRate: Annotated[float, Field(ge=0, le=1)]


class Contribution(BaseModel):
    feature: str
    value: float
    contribution: float


class PredictionResponse(BaseModel):
    prediction: str
    maintenance_probability: float
    risk_level: str
    feature_contributions: list[Contribution]
    recommendations: list[str]
    label: str
    probability: float
    contributions: list[Contribution]
    model: str


app = FastAPI(title="RoadMind AI Soft Voting Ensemble Prediction API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


def load_model():
    model_path = MODEL_PATH if MODEL_PATH.exists() else FALLBACK_MODEL_PATH if FALLBACK_MODEL_PATH.exists() else None
    if model_path is None:
        raise FileNotFoundError(f"No model file found at {MODEL_PATH} or {FALLBACK_MODEL_PATH}")

    try:
        return joblib.load(model_path), model_path.name
    except Exception as exc:
        raise RuntimeError(f"Unable to deserialize model from {model_path}: {exc}") from exc


def fallback_probability(features_df: pd.DataFrame) -> float:
    row = features_df.iloc[0]
    score = 0.0
    score += max(0.0, (float(row["Engine_Temperature"]) - 90.0) / 30.0) * 0.18
    score += max(0.0, (float(row["Vibration_Levels"]) - 2.5) / 4.0) * 0.16
    score += max(0.0, (float(row["Oil_Quality"]) - 50.0) / 80.0) * 0.12
    score += max(0.0, (float(row["Battery_Status"]) - 60.0) / 60.0) * 0.10
    score += max(0.0, (float(row["Tire_Pressure"]) - 30.0) / 50.0) * 0.08
    score += max(0.0, (float(row["Failure_History"]) - 0.5) / 8.0) * 0.10
    score += max(0.0, (float(row["Anomalies_Detected"]) - 0.5) / 8.0) * 0.10
    score += max(0.0, (float(row["Diagnostic_Trouble_Code_Count"]) - 0.5) / 6.0) * 0.08
    score += max(0.0, (float(row["CAN_Message_Rate_Hz"]) - 25.0) / 75.0) * 0.06
    score += max(0.0, (float(row["Sensor_Packet_Loss_Rate"]) - 0.10) / 0.90) * 0.12
    score += max(0.0, (float(row["Actual_Load"]) - 0.7 * float(row["Load_Capacity"])) / max(float(row["Load_Capacity"]), 1.0)) * 0.10
    probability = 1.0 / (1.0 + np.exp(-score))
    return float(np.clip(probability, 0.02, 0.98))


try:
    model, model_name = load_model()
    model_error = None
except Exception as error:
    model = None
    model_name = "unavailable"
    model_error = str(error)


def request_to_feature_dict(request: PredictionRequest) -> dict[str, float]:
    return {
        "Make_and_Model": float(request.makeAndModel),
        "Vehicle_Type": float(request.vehicleType),
        "Year_of_Manufacture": float(request.yearOfManufacture),
        "Road_Conditions": float(request.roadConditions),
        "Weather_Conditions": float(request.weatherConditions),
        "Route_Info": float(request.routeInfo),
        "Usage_Hours": float(request.usageHours),
        "Load_Capacity": float(request.loadCapacity),
        "Actual_Load": float(request.actualLoad),
        "Engine_Temperature": float(request.engineTemp),
        "Fuel_Consumption": float(request.fuelConsumption),
        "Battery_Status": float(request.batteryStatus),
        "Oil_Quality": float(request.oilQuality),
        "Vibration_Levels": float(request.vibration),
        "Tire_Pressure": float(request.tirePressure),
        "Failure_History": float(request.failureHistory),
        "Anomalies_Detected": float(request.anomaliesDetected),
        "Diagnostic_Trouble_Code_Count": float(request.diagnosticTroubleCodeCount),
        "CAN_Message_Rate_Hz": float(request.canMessageRateHz),
        "Sensor_Packet_Loss_Rate": float(request.sensorPacketLossRate),
    }


def to_model_features(request: PredictionRequest) -> pd.DataFrame:
    feature_dict = request_to_feature_dict(request)
    return pd.DataFrame([feature_dict], columns=FEATURE_NAMES)


def load_background_data() -> pd.DataFrame:
    if BACKGROUND_PATH.exists():
        try:
            df = pd.read_csv(BACKGROUND_PATH)
            if "Maintenance_Required" in df.columns:
                df = df.drop(columns=["Maintenance_Required"])
            df = df[[column for column in FEATURE_NAMES if column in df.columns]]
            if df.shape[1] == len(FEATURE_NAMES):
                return df.sample(n=min(20, len(df)), random_state=42).reset_index(drop=True)
        except Exception:
            pass

    return pd.DataFrame(np.zeros((10, len(FEATURE_NAMES)), dtype=float), columns=FEATURE_NAMES)


def calculate_feature_contributions(model_obj, features_df: pd.DataFrame) -> list[Contribution]:
    if model_obj is None:
        row = features_df.iloc[0]
        scores = []
        for index, name in enumerate(FEATURE_NAMES):
            value = float(row[name])
            if name in {"Engine_Temperature", "Vibration_Levels", "Failure_History", "Anomalies_Detected", "Diagnostic_Trouble_Code_Count", "CAN_Message_Rate_Hz", "Sensor_Packet_Loss_Rate"}:
                contribution = (value - (0 if name == "Sensor_Packet_Loss_Rate" else 0.5)) / max(1.0, value + 1.0)
            elif name in {"Oil_Quality", "Battery_Status", "Tire_Pressure"}:
                contribution = (50.0 - value) / 100.0
            else:
                contribution = (value / max(1.0, float(value) + 1.0)) * 0.5
            scores.append(contribution)
        return [
            Contribution(feature=FEATURE_NAMES[index], value=float(row[FEATURE_NAMES[index]]), contribution=float(scores[index]))
            for index in range(len(FEATURE_NAMES))
        ]

    values = [0.0] * len(FEATURE_NAMES)
    if shap is not None:
        try:
            background_df = load_background_data()
            explainer = shap.Explainer(model_obj.predict_proba, background_df)
            explanation = explainer(features_df)
            if len(explanation.values.shape) == 3:
                values = explanation.values[0, :, 1]
            else:
                values = explanation.values[0]
        except Exception:
            pass

    return [
        Contribution(
            feature=FEATURE_NAMES[index],
            value=float(features_df.iloc[0, index]),
            contribution=float(values[index]),
        )
        for index in range(len(FEATURE_NAMES))
    ]


def get_risk_level(prob: float) -> str:
    if prob < 0.40:
        return "Low"
    elif prob < 0.70:
        return "Medium"
    else:
        return "High"


def generate_recommendations(contributions: list[Contribution], prob: float, prediction_label: str) -> list[str]:
    if prob < 0.40:
        return ["Vehicle is healthy. Perform standard routine inspection according to scheduled maintenance."]

    recs = []
    sorted_contribs = sorted(contributions, key=lambda c: abs(c.contribution), reverse=True)
    top_features = [c.feature.lower() for c in sorted_contribs[:8]]
    top_str = " ".join(top_features)

    if "engine_temperature" in top_str:
        recs.append("Inspect engine cooling system, radiator, and coolant levels.")
    if "oil_quality" in top_str:
        recs.append("Inspect engine oil quality, oil filter, and consider oil servicing.")
    if "vibration_levels" in top_str:
        recs.append("Inspect engine mounts, driveshaft, and mechanical vibration components.")
    if "battery_status" in top_str:
        recs.append("Inspect battery charge, terminal contacts, and electrical alternator.")
    if "tire_pressure" in top_str:
        recs.append("Inspect tire pressure, tread wear, and wheel alignment.")
    if "fuel_consumption" in top_str:
        recs.append("Inspect fuel delivery system, fuel filters, and engine efficiency.")
    if "road_conditions" in top_str:
        recs.append("Inspect chassis and suspension system for impact from poor road conditions.")
    if any(k in top_str for k in ["diagnostic_trouble_code_count", "anomalies_detected", "can_message_rate_hz"]):
        recs.append("Perform full OBD/CAN bus diagnostic scan to resolve active DTC anomaly codes.")

    if not recs:
        recs.append("Perform comprehensive powertrain and chassis inspection due to elevated maintenance risk.")

    return recs


@app.on_event("startup")
def on_startup():
    init_database()


@app.get("/api/db/status")
def db_status() -> dict:
    """Check MongoDB Atlas cluster connectivity and collection stats."""
    return check_connection_status()


@app.get("/api/fleet")
def fleet_list() -> list:
    """Retrieve all fleet vehicles from MongoDB Atlas."""
    return get_fleet_vehicles()


@app.get("/api/fleet/summary")
def fleet_summary() -> dict:
    """Retrieve aggregate fleet KPIs (active count, risk averages) from Atlas."""
    return get_fleet_summary()


@app.get("/api/fleet/high-risk")
def fleet_high_risk() -> list:
    """Retrieve top high-risk fleet vehicles ranked by risk score."""
    return get_top_high_risk_vehicles(limit=5)


@app.get("/api/scans")
def scans_list(limit: int = 20) -> list:
    """Retrieve recent diagnostic scans logged into MongoDB Atlas."""
    return get_recent_scans(limit=limit)


@app.get("/api/stats")
def platform_stats() -> dict:
    """Retrieve high-level platform KPIs for Landing and Overview."""
    return get_fleet_stats()


@app.get("/api/routes")
def routes_list() -> list:
    """Retrieve road surface rankings and terrain stress data from Atlas."""
    return get_routes()


@app.get("/api/case-analysis")
def case_analysis() -> dict:
    """Retrieve the top critical fleet vehicle case analysis with recommendations."""
    return get_top_case_vehicle()


@app.get("/api/health")
def health() -> dict[str, str]:
    global model, model_name, model_error
    if model is None:
        try:
            model, model_name = load_model()
            model_error = None
        except Exception as error:
            model_error = str(error)
            model = None
            model_name = "fallback-heuristic"

    return {
        "status": "ok" if model is not None or "fallback" in str(model_name).lower() else "error",
        "model": model_name,
        "error": model_error or "",
    }


@app.post("/api/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest) -> PredictionResponse:
    global model, model_name, model_error
    features_df = to_model_features(request)

    if model is None:
        try:
            model, model_name = load_model()
            model_error = None
        except Exception as error:
            model_error = str(error)
            model = None
            model_name = "fallback-heuristic"

    try:
        if model is not None:
            probability = float(model.predict_proba(features_df)[0][1])
        else:
            probability = fallback_probability(features_df)
    except Exception as error:
        probability = fallback_probability(features_df)

    contributions = calculate_feature_contributions(model, features_df)
    label = "Maintenance Required" if probability >= 0.5 else "No Maintenance Required"
    risk_level = get_risk_level(probability)
    recommendations = generate_recommendations(contributions, probability, label)

    try:
        telemetry_dict = request.model_dump() if hasattr(request, "model_dump") else request.dict()
        log_diagnostic_scan(
            vehicle_id="VH-LIVE",
            vehicle_name="Live Telemetry Diagnostic",
            prediction_label=label,
            probability=probability,
            risk_level=risk_level,
            telemetry=telemetry_dict,
            recommendations=recommendations,
        )
    except Exception:
        pass

    return PredictionResponse(
        prediction=label,
        maintenance_probability=probability,
        risk_level=risk_level,
        feature_contributions=contributions,
        recommendations=recommendations,
        label=label,
        probability=probability,
        contributions=contributions,
        model=model_name,
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)

