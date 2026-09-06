import Papa from 'papaparse';
import type { DemoInput } from '../types';

const MAX_BYTES = 250_000;
const fields: (keyof DemoInput)[] = [
  'makeAndModel', 'vehicleType', 'yearOfManufacture', 'roadConditions', 'weatherConditions', 'routeInfo',
  'usageHours', 'loadCapacity', 'actualLoad', 'engineTemp', 'fuelConsumption', 'batteryStatus', 'oilQuality',
  'vibration', 'tirePressure', 'failureHistory', 'anomaliesDetected', 'diagnosticTroubleCodeCount',
  'canMessageRateHz', 'sensorPacketLossRate',
];

export function parseDemoCsv(file: File): Promise<DemoInput[]> {
  if (file.size > MAX_BYTES) return Promise.reject(new Error('CSV is too large. Please upload a file under 250 KB.'));
  if (!file.name.toLowerCase().endsWith('.csv')) return Promise.reject(new Error('Please choose a .csv file.'));
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length) return reject(new Error('The CSV could not be parsed. Check the header row and values.'));
        try {
          const rows = results.data.slice(0, 20).map((row) => {
            const item = {} as DemoInput;
            for (const field of fields) {
              const value = Number(row[field]);
              if (!Number.isFinite(value)) throw new Error(`Invalid value in ${field}. Use numeric values only.`);
              item[field] = value;
            }
            return item;
          });
          if (!rows.length) throw new Error('The CSV contains no data rows.');
          resolve(rows);
        } catch (error) { reject(error); }
      },
      error: () => reject(new Error('Unable to read this CSV file.'))
    });
  });
}
