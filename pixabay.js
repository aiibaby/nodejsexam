const request = require('request');

var getWeather = (keyword) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://pixabay.com/api/?key=10969283-3e743653e7acb8be99ce2a01d&q='+ encodeURIComponent(keyword) + '&image_type=photo',
            json: true
        }, (error, response, body) => {
            if(error) {
                reject('Cannot connect to pixabay.');
            }
            else if(body.totalHits === 0) {
                reject('The given location is invalid.');
            }
            else {
                resolve({
                    image1: body.hits[1].webformatURL,
                    image2: body.hits[2].webformatURL,
                    image3: body.hits[3].webformatURL,
                    image4: body.hits[4].webformatURL,
                });   
            }
        });
    });
};

module.exports = {
    getWeather
}