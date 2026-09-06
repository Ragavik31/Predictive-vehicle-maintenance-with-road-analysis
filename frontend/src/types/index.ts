export type DemoInput = {
  makeAndModel: number;
  vehicleType: number;
  yearOfManufacture: number;
  roadConditions: number;
  weatherConditions: number;
  routeInfo: number;
  usageHours: number;
  loadCapacity: number;
  actualLoad: number;
  engineTemp: number;
  fuelConsumption: number;
  batteryStatus: number;
  oilQuality: number;
  vibration: number;
  tirePressure: number;
  failureHistory: number;
  anomaliesDetected: number;
  diagnosticTroubleCodeCount: number;
  canMessageRateHz: number;
  sensorPacketLossRate: number;
};

export type Prediction = {
  label: string;
  probability: number;
  contributions: { feature: string; value: number; contribution: number }[];
  prediction?: string;
  maintenance_probability?: number;
  risk_level?: string;
  feature_contributions?: { feature: string; value: number; contribution: number }[];
  recommendations?: string[];
  model?: string;
};

