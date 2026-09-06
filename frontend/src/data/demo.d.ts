import type { DemoInput, Prediction } from '../types';
export declare const sampleRows: DemoInput[];
export declare const sampleCsv = "engineTemp,oilPressure,vibration,mileage,roadRoughness,brakingEvents\n94,31,4.8,112000,0.82,14\n82,42,2.1,54000,0.35,6\n89,37,3.2,78000,0.55,9\n";
export declare function predict(input: DemoInput): Prediction;
