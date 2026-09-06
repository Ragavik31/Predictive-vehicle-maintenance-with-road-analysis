import { parseDemoCsv } from '../src/lib/csv';

test('rejects non-csv files', async () => {
  await expect(parseDemoCsv(new File(['x'], 'bad.txt'))).rejects.toThrow('Please choose a .csv file.');
});

test('rejects malformed numeric values', async () => {
  const csv = 'makeAndModel,vehicleType,yearOfManufacture,roadConditions,weatherConditions,routeInfo,usageHours,loadCapacity,actualLoad,engineTemp,fuelConsumption,batteryStatus,oilQuality,vibration,tirePressure,failureHistory,anomaliesDetected,diagnosticTroubleCodeCount,canMessageRateHz,sensorPacketLossRate\nfoo,4,2016,4,4,1,12881,14610,8523,89,6,90,82,0.58,39.9,0,0,0,43,0.001';
  await expect(parseDemoCsv(new File([csv], 'sample.csv'))).rejects.toThrow('Invalid value in makeAndModel');
});
