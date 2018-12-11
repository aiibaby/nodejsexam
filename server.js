const express = require('express'),
    request = require('request'),
    fs = require('fs');
    hbs = require('hbs'),
    bodyParser = require('body-parser')

    port = process.env.PORT || 8080;

const darksky = require("./darksky.js")
const gmap = require("./gmap.js")
const pixabay = require("./pixabay.js")

const cloud = '/icons/cloud.png';
const clear = '/icons/Clear.png';
const clear_night = '/icons/clear_night.png'
const Partly_Cloudy = '/icons/partly_cloudy.png';
const drizzle = '/icons/drizzle.png';

var app = express();

app.use(bodyParser.urlencoded({
    extended:true
}))


hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getTime', () => {
    date = new Date();
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
});

hbs.registerHelper('upper', (text) => {
    return text.toUpperCase();
})

app.use(express.static(__dirname + '/public'));


app.use((request, response, next) => {
    var time = new Date().toString()
    console.log(time)
    next()
})

app.get('/', (request, response) => {
	response.render('index.hbs', {
		title: 'Homepage',
        welcomeMessage: 'This is homepage!!!',
	});
});

app.get('/gallery', (request, response) => {
	response.render('gallery.hbs', {
		title: 'Gallery report',
		welcomeMessage: 'This is gallery page!!!'
	});
});

app.get('/404', (request, response) => {
    response.send('Page not found!')
});


app.post("/", (request, response) => {
    let {
        place
    } = request.body;
    gmap.geocode(place).then(res => {
        var lat = res['lat'];
        var lng = res['lng'];
        darksky.getWeather(lat, lng).then(res => {
            if (res) {
                response.render('index.hbs', {
                    summary:res['status'],
                    icon: `<img src=/icons/${res['status']}.png>`,
                    temp: res['temp']
                })
            }
        })
    })
    .catch(
        (err)=> {
            response.status(400);
            response.send('Can not find the weather!!!');
        }
    )
})

app.post("/gallery", (request, response) => {
    let {
        keyword
    } = request.body;
    pixabay.getWeather(keyword).then (res => {
        if (res) {
            response.render('gallery.hbs', {
                image1 : res['image1'],
                image2 : res['image2'],
                image3 : res['image3'],
                image4 : res['image4'],
            })
        }
    }).catch(
        (err)=> {
            response.status(400);
            response.send('Can not find any image!!!');
        }
    )
})

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});

