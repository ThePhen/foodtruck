/**
 * This applies the haversine distance fn over a dataset.
 *
 * @type {(function(*, *, *=): *)|*}
 */
const haversine = require('./haversine');

module.exports = ([long, lat]) => function foo(row) {
    return {distance: haversine([long, lat], [row.Longitude, row.Latitude], true), ...row};
}
