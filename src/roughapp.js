const geoCode = require('./utils/geoCode.js')
const foreCast = require('./utils/foreCast.js')

geoCode(process.argv[2], (error, { latitude, longitude, location } = {}) =>
{
    if (error) {
        return console.log(error);
    }
    foreCast(latitude, longitude, (error, data) => {
        if (error) {
            return console.log(error);
        }
        console.log(location);
        console.log(data);
    })
})