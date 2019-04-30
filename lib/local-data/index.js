/**
 * This fetches a locally stored copy of the Food Truck data from DataSF. Makes testing on & offline easier, plus
 * doesn't pound DataSF's website.
 *
 * Uses CSV parsing tips & tricks from:
 * https://stackabuse.com/reading-and-writing-csv-files-with-node-js/
 */

const csv = require('csv-parser');

function getStream() {
    const fs = require('fs');
    return fs.createReadStream('./lib/local-data/Mobile_Food_Facility_Permit.csv');
}

module.exports = function getData() {
    return new Promise((res, rej) => {
        const data = [];

        getStream()
            .pipe(csv())
            .on('data', (row) => {
                data.push(row)
            })
            .on('end', () => {
                res(data);
            });
    })
};
