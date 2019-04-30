/** This fetches the latest Food Truck data from the DataSF website.
 * See the following link for more information:
 * https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat/data
 */
const csv = require('csv-parser');
const {get} = require('https');

function checkForErrors(res) {
    const {statusCode} = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
            `Status Code: ${statusCode}`);
    } else if (!/^text\/csv/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
            `Expected application/json but received ${contentType}`);
    }
    return error;
}

module.exports = async () => {
    return new Promise((result, rej) => {
        const data = [];

        get('https://data.sfgov.org/api/views/rqzj-sfat/rows.csv', (res) => {

            let error = checkForErrors(res);
            if (error) {
                res.resume(); // free mem for the fetch
                rej(error);
                return;
            }

            res.pipe(csv())
                .on('data', (row) => {
                    data.push(row)
                })
                .on('end', () => {
                    result(data);
                });
        })
    })
};


