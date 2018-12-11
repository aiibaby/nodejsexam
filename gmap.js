const request = require('request');

var geocode = (address) => {
    // return new Promise
    return new Promise((resolve, reject) => {
    	request({
    		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBdZyWZ9E-pTqDt7hO4rAauB7BDeOPaAJM`,
    		json: true
    	}, (error, response, body) => {
    		if (error) {
    			reject('Cannot connect to Google Maps');
    		} else if (body.status === 'ZERO_RESULTS'){
    			reject('Cannot find requested address');
    		} else if (body.status === 'OK') {
    			resolve({
    				lat: body.results[0].geometry.location.lat,
    				lng: body.results[0].geometry.location.lng
    			});
    		}
    	})
    })
};

module.exports = {
    geocode
}