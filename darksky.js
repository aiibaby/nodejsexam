const request = require('request');

var getWeather = (lat, lon) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://api.darksky.net/forecast/1816ac2569087eaf83e7e7a24c5c00b8/' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon),
            json: true
        }, (error, response, body) => {
            if(error) {
                reject('Cannot connect to Dark Sky.');
            }
            else if(body.code == 400) {
                reject('The given location is invalid.');
            }
            else {
                resolve({
                    status: body.currently.summary,
                    temp: body.currently.temperature
                });   
            }
        });
    });
};

module.exports = {
    getWeather
}