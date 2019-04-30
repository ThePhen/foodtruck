require('dotenv').config(); // incorporate a ./.env file, if present

const CURR_LONGITUDE = process.env.CURR_LONGITUDE;
const CURR_LATITUDE = process.env.CURR_LATITUDE;

if (!CURR_LATITUDE || !CURR_LONGITUDE) {
    console.error("Environment variables 'CURR_LATITUDE' and 'CURR_LONGITUDE' must be set. One is not. Set both and try again.")
    process.exit(-1);
}

const IS_REMOTE = process.env.USE_REMOTE || 'NO';
const getData = require(IS_REMOTE === 'YES' ? './lib/remote-data' : './lib/local-data');

const LIMIT = parseInt(process.env.LIMIT || '100');
const takeAFew = data => data.slice(0, LIMIT);

const currentLongitude = parseFloat(CURR_LONGITUDE);
const currentLatitude = parseFloat(CURR_LATITUDE);
const insertDistance = require('./lib/calc-distance')([currentLongitude, currentLatitude]);

const marshalFromDataSFFormatText = require('./lib/marshal-data');
const applyFilters = require('./lib/data-filters'); // trucks only, remove items without location
const sortByDistance = require('./lib/sort-distance');

const transformData = (data) => data.map((row) => {
    return insertDistance(marshalFromDataSFFormatText(row)) // chain the xforms
});

getData()
    .then(transformData)
    .then(applyFilters)
    .then(sortByDistance)
    .then(takeAFew)
    .then(console.table)
    .catch(console.error);
