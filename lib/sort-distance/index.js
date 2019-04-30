const sortDistanceFn = require('./sort-distance');

/**
 * Simply applies a sort fn over a dataset.
 *
 * @param data
 * @returns {*|void|this|this|this|this|this|this|this|this|this|this|this|this}
 */
module.exports = function (data) {
    return data.sort(sortDistanceFn);
};
