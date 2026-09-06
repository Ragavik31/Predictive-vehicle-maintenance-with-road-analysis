export type DemoInput = {
    engineTemp: number;
    oilPressure: number;
    vibration: number;
    mileage: number;
    roadRoughness: number;
    brakingEvents: number;
};
export type Prediction = {
    label: 'Maintenance likely' | 'No immediate maintenance';
    probability: number;
    contributions: {
        feature: string;
        value: number;
        contribution: number;
    }[];
};
