module.exports = () => {
    console.error(`
To use this tool, set the following environment variables before calling this tool:
CURR_LONGITUDE : (mandatory) a WGS84 longitude. Eg: -122.414007297597
CURR_LATITUDE : (mandatory) a WGS84 longitude. Eg: 37.7708182299993
USE_REMOTE : (optional) set to 'YES' to cause the tool to use fresh Food Truck data by fetching over the Internet.
LIMIT : (option) an integer representing the number of food truck linsting you want to list. Eg. 5`);
};
