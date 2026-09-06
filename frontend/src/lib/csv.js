import Papa from 'papaparse';
var MAX_BYTES = 250000;
var fields = ['engineTemp', 'oilPressure', 'vibration', 'mileage', 'roadRoughness', 'brakingEvents'];
export function parseDemoCsv(file) {
    if (file.size > MAX_BYTES)
        return Promise.reject(new Error('CSV is too large. Please upload a file under 250 KB.'));
    if (!file.name.toLowerCase().endsWith('.csv'))
        return Promise.reject(new Error('Please choose a .csv file.'));
    return new Promise(function (resolve, reject) {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                if (results.errors.length)
                    return reject(new Error('The CSV could not be parsed. Check the header row and values.'));
                try {
                    var rows = results.data.slice(0, 20).map(function (row) {
                        var item = {};
                        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
                            var field = fields_1[_i];
                            var value = Number(row[field]);
                            if (!Number.isFinite(value))
                                throw new Error("Invalid value in ".concat(field, ". Use numeric values only."));
                            item[field] = value;
                        }
                        return item;
                    });
                    if (!rows.length)
                        throw new Error('The CSV contains no data rows.');
                    resolve(rows);
                }
                catch (error) {
                    reject(error);
                }
            },
            error: function () { return reject(new Error('Unable to read this CSV file.')); }
        });
    });
}
