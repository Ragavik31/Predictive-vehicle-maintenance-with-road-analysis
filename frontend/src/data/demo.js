export var sampleRows = [
    { engineTemp: 94, oilPressure: 31, vibration: 4.8, mileage: 112000, roadRoughness: 0.82, brakingEvents: 14 },
    { engineTemp: 82, oilPressure: 42, vibration: 2.1, mileage: 54000, roadRoughness: 0.35, brakingEvents: 6 },
    { engineTemp: 89, oilPressure: 37, vibration: 3.2, mileage: 78000, roadRoughness: 0.55, brakingEvents: 9 },
    { engineTemp: 97, oilPressure: 28, vibration: 5.4, mileage: 131000, roadRoughness: 0.91, brakingEvents: 17 },
    { engineTemp: 79, oilPressure: 45, vibration: 1.7, mileage: 31000, roadRoughness: 0.22, brakingEvents: 4 }
];
export var sampleCsv = "engineTemp,oilPressure,vibration,mileage,roadRoughness,brakingEvents\n94,31,4.8,112000,0.82,14\n82,42,2.1,54000,0.35,6\n89,37,3.2,78000,0.55,9\n";
var featureMeta = [
    ['Engine temperature', 90, 7],
    ['Oil pressure', 35, 8],
    ['Vibration', 3.5, 0.7],
    ['Mileage', 90000, 26000],
    ['Road roughness', 0.6, 0.28],
    ['Braking events', 10, 5]
];
export function predict(input) {
    var raw = (input.engineTemp - 90) / 7 +
        (35 - input.oilPressure) / 8 +
        (input.vibration - 3.5) / 0.7 +
        (input.mileage - 90000) / 26000 +
        (input.roadRoughness - 0.6) / 0.28 +
        (input.brakingEvents - 10) / 5;
    var probability = 1 / (1 + Math.exp(-raw / 2.8));
    var contributions = featureMeta.map(function (_a, index) {
        var feature = _a[0], baseline = _a[1], scale = _a[2];
        var keys = ['engineTemp', 'oilPressure', 'vibration', 'mileage', 'roadRoughness', 'brakingEvents'];
        var value = input[keys[index]];
        var signed = index === 1 ? (baseline - value) / scale : (value - baseline) / scale;
        return { feature: feature, value: value, contribution: signed };
    });
    return { label: probability >= 0.5 ? 'Maintenance likely' : 'No immediate maintenance', probability: probability, contributions: contributions };
}
