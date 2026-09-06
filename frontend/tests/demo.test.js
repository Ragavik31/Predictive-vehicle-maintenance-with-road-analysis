import { predict } from '../src/data/demo';
test('high-risk sample returns a maintenance-likely prediction', function () {
    var result = predict({ engineTemp: 97, oilPressure: 28, vibration: 5.4, mileage: 131000, roadRoughness: .91, brakingEvents: 17 });
    expect(result.label).toBe('Maintenance likely');
    expect(result.probability).toBeGreaterThan(.5);
    expect(result.contributions).toHaveLength(6);
});
test('low-risk sample returns a lower risk', function () {
    var result = predict({ engineTemp: 79, oilPressure: 45, vibration: 1.7, mileage: 31000, roadRoughness: .22, brakingEvents: 4 });
    expect(result.label).toBe('No immediate maintenance');
    expect(result.probability).toBeLessThan(.5);
});
