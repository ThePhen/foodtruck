/**
 * Filters out data that isn't about food trucks, or that doesn't have location data.
 *
 * @param data
 * @returns {*}
 */
module.exports = function (data) {
    return data.filter(row => row.FacilityType === 'Truck' && row.Latitude && row.Longitude);
};
