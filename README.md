# 🚛 Predictive Vehicle Maintenance with Road Analysis using Machine Learning

An end-to-end AI-powered predictive maintenance system that combines vehicle operational data, diagnostic metrics, weather conditions, and road-condition analysis to predict maintenance requirements for logistics fleet vehicles before catastrophic failures occur.

---

## 📖 Project Overview

Unexpected vehicle failures increase operational costs, vehicle downtime, and safety risks in commercial logistics fleets. Traditional maintenance strategies rely on fixed mileage intervals or reactive repairs, leading to either premature servicing or unscheduled breakdowns.

This project implements a **Soft Voting Ensemble Machine Learning Architecture** that combines four diverse base estimators—**Logistic Regression**, **Random Forest**, **XGBoost**, and **LightGBM**—trained on SMOTE-balanced logistics data. The system provides real-time maintenance prediction probabilities, risk levels, **SHAP Explainable AI** feature contributions, and automated component-level inspection recommendations via a **FastAPI backend** and a modern **React/TypeScript web application**.

---

## 🏗 Final Project Architecture

```text
Logistics Fleet Dataset
        ↓
EDA
        ↓
Preprocessing
        ↓
Feature Leakage Analysis
        ↓
Feature Selection
        ↓
Train-Test Split (80% Train / 20% Test)
        ↓
SMOTE (Applied to Training Data Only)
        ↓
Train Four Base Models
    ├── Logistic Regression
    ├── Random Forest
    ├── XGBoost
    └── LightGBM
        ↓
Soft Voting Ensemble (voting='soft')
        ↓
Final Maintenance Prediction
        ↓
SHAP / Explainable AI
        ↓
Maintenance Risk Explanation
        ↓
Recommended Inspection
        ↓
Backend API (FastAPI)
        ↓
RoadMind AI Fleet Web Application
```


## 🎯 Key Objectives & Scope

- **End-to-End Pipeline**: From raw data exploratory analysis to a deployed web interface.
- **Leakage-Free Feature Set**: Rigorous feature leakage removal ensuring realistic predictions.
- **Strict Data Integrity**: SMOTE data balancing applied exclusively to training data; test set remains untouched.
- **Soft Voting Ensemble**: Combines four base learners (**Logistic Regression**, **Random Forest**, **XGBoost**, **LightGBM**) using probability averaging (`voting='soft'`). No separate hyperparameter tuning stage.
- **Explainable AI (SHAP)**: Uses model-agnostic SHAP values to explain feature contributions for every vehicle prediction.
- **Actionable Inspections**: Translates feature contributions into targeted vehicle component inspection recommendations.
- **Web & Backend Deployment**: FastAPI microservice serving real-time predictions to an interactive logistics fleet dashboard.

---

##  Model Evaluation Results (Test Set)

All seven model variations were evaluated on the exact same untouched test set:

| Model | Accuracy | Precision | Recall | F1 Score | ROC-AUC |
|---|---|---|---|---|---|
| **Logistic Regression** | 0.94044 | 0.93986 | 0.87182 | 0.90456 | 0.92315 |
| **Soft Voting Ensemble** *(Final Architecture)* | **0.94036** | **0.93938** | **0.87207** | **0.90447** | **0.92478** |
| **Random Forest** | 0.93992 | 0.93748 | 0.87262 | 0.90389 | 0.92474 |
| **XGBoost** | 0.93860 | 0.93368 | 0.87231 | 0.90195 | 0.92489 |
| **LightGBM** | 0.93842 | 0.93301 | 0.87244 | 0.90171 | 0.92485 |
| **Stacking Ensemble** | 0.93842 | 0.93261 | 0.87287 | 0.90175 | 0.92455 |
| **Easy Ensemble** | 0.93806 | 0.93236 | 0.87194 | 0.90114 | 0.92392 |

> **Architectural Selection Rationale**: The **Soft Voting Ensemble** combines the complementary strengths of linear modeling and non-linear decision trees (Logistic Regression + Random Forest + XGBoost + LightGBM), delivering balanced, highly reliable maintenance risk predictions with **94.04% Accuracy** and **0.9248 ROC-AUC**.

---

## 🧠 Explainable AI & Maintenance Recommendations

For each vehicle analysis, the system:
1. Calculates prediction probability $P(\text{Maintenance Required})$.
2. Categorizes **Risk Level**:
   - **Low**: Probability < 40%
   - **Medium**: 40% ≤ Probability < 70%
   - **High**: Probability ≥ 70%
3. Generates **SHAP Feature Contributions** quantifying the impact of each telemetry feature.
4. Generates **Recommended Inspection Areas**:
   - Elevated `Engine_Temperature` $\rightarrow$ Inspect engine cooling system, radiator, and coolant levels.
   - High `Vibration_Levels` $\rightarrow$ Inspect engine mounts, driveshaft, and mechanical vibration components.
   - Low `Oil_Quality` $\rightarrow$ Inspect engine oil quality, oil filter, and consider oil servicing.
   - Low `Battery_Status` $\rightarrow$ Inspect battery charge, terminal contacts, and electrical alternator.
   - Low `Tire_Pressure` $\rightarrow$ Inspect tire pressure, tread wear, and wheel alignment.
   - DTC / Anomaly / CAN Bus counters $\rightarrow$ Perform full OBD-II / CAN bus diagnostic scan.

---

## 🛠 Technology Stack

| Category | Technologies / Libraries |
|---|---|
| **Programming Language** | Python 3.10+, TypeScript |
| **Machine Learning** | Scikit-learn, XGBoost, LightGBM, Imbalanced-learn |
| **Explainable AI (XAI)** | SHAP (Shapley Additive exPlanations) |
| **Data Science & Math** | Pandas, NumPy, Joblib |
| **Data Visualization** | Matplotlib, Seaborn |
| **Backend API** | FastAPI, Uvicorn, Pydantic |
| **Frontend Framework** | React 18, Vite, Tailwind CSS, Lucide Icons |

---

## 💻 Project Structure

```text
Predictive-vehicle-maintenance-with-road-analysis/
├── Model/
│   ├── data/
│   │   ├── raw/
│   │   └── processed/
│   ├── models/
│   │   └── voting_ensemble_model.pkl
│   ├── results/
│   │   └── final_model_comparison.csv
│   └── notebooks/
├── backend/
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── types/
│   └── package.json
├── Documentation/
├── README.md
└── Reference/
```

---

## 🚦 How to Run the Project

### 1. Run Machine Learning Pipeline
```bash
cd Model
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
# Run notebooks 01 through 10 in Jupyter or VS Code
```

### 2. Start Backend API Service
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# API running at http://localhost:8000 (Docs at http://localhost:8000/docs)
```

### 3. Start Frontend Web Application
```bash
cd frontend
npm install
npm run dev
# Web App running at http://localhost:5173
```

---

## 👩‍💻 Authors

- **Ragavi K**
- **Medhuna P**
- **Praveena S**

