/**
 * Transform the text-centric CSV data that comes from DataSF into proper JavaScript data types
 * Notably, convert the lat & lon into floats.
 *
 * This is also a potential place to omit data that isn't needed from the original dataset.
 *
 * @param row
 * @returns { transformed row data}
 */
function marshallFn(row) {
    return {
        ...row,
        Longitude: parseFloat(row.Longitude),
        Latitude: parseFloat(row.Latitude)
    };
}

module.exports = marshallFn;
