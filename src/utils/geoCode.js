const request = require('request')

const geoCode = (address, callback) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW1pdC1rbXIiLCJhIjoiY2s4cmMwZHZxMDFrZTNscGVzYzJ5Mzg0aCJ9._YkIuhpMCw1TTeHKLEy-1A&limit=1'
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + ' ' + '.json?access_token=pk.eyJ1IjoiYW1pdC1rbXIiLCJhIjoiY2s4cmMwZHZxMDFrZTNscGVzYzJ5Mzg0aCJ9._YkIuhpMCw1TTeHKLEy-1A&limit=1'
    request({ url, json: true }, (error, {body}= {}) =>
    {
        if (error) {
            callback('Can not conect to the geoCode server.', undefined);
        }
        else if (body.features.length === 0) {
            callback('Can not fetch geoCode data.', undefined)
        }
        else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
            })
        }
    })
}
module.exports = geoCode