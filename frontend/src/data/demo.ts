import type { DemoInput, Prediction } from '../types';

export const sampleRows: DemoInput[] = [
  {
    makeAndModel: 1,
    vehicleType: 4,
    yearOfManufacture: 2016,
    roadConditions: 4,
    weatherConditions: 4,
    routeInfo: 1,
    usageHours: 12881.93,
    loadCapacity: 14610.71,
    actualLoad: 8523.58,
    engineTemp: 89.15,
    fuelConsumption: 6.03,
    batteryStatus: 90.13,
    oilQuality: 82.44,
    vibration: 0.58,
    tirePressure: 39.9,
    failureHistory: 0,
    anomaliesDetected: 0,
    diagnosticTroubleCodeCount: 0,
    canMessageRateHz: 43.12,
    sensorPacketLossRate: 0.0017,
  },
];

export const sampleCsv = `makeAndModel,vehicleType,yearOfManufacture,roadConditions,weatherConditions,routeInfo,usageHours,loadCapacity,actualLoad,engineTemp,fuelConsumption,batteryStatus,oilQuality,vibration,tirePressure,failureHistory,anomaliesDetected,diagnosticTroubleCodeCount,canMessageRateHz,sensorPacketLossRate
1,4,2016,4,4,1,12881.93,14610.71,8523.58,89.15,6.03,90.13,82.44,0.58,39.9,0,0,0,43.12,0.0017
`;

export function predict(input: DemoInput): Prediction {
  const probability = input.engineTemp > 95 || input.anomaliesDetected > 1 ? 0.75 : 0.25;
  return {
    label: probability >= 0.5 ? 'Maintenance likely' : 'No immediate maintenance',
    probability,
    contributions: Object.entries(input).map(([feature, value]) => ({ feature, value, contribution: 0 })),
  };
}
