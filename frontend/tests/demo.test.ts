import { predict, sampleRows } from '../src/data/demo';

test('high-risk sample returns a maintenance-likely prediction', () => {
  const result = predict({ ...sampleRows[0], engineTemp: 97, anomaliesDetected: 2 });
  expect(result.label).toBe('Maintenance likely');
  expect(result.probability).toBeGreaterThan(.5);
  expect(result.contributions).toHaveLength(20);
});

test('low-risk sample returns a lower risk', () => {
  const result = predict(sampleRows[0]);
  expect(result.label).toBe('No immediate maintenance');
  expect(result.probability).toBeLessThan(.5);
});
