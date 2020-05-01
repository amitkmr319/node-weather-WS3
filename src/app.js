const geoCode = require('./utils/geoCode.js')
const foreCast = require('./utils/foreCast.js')
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const app = express()

const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

const viewsPath = path.join(__dirname, '../templates/views')
app.set('view engine', 'hbs')
app.set('views', viewsPath)

const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

app.get('', (req, res) =>
{
    res.render('index', {
        title: 'Home page',
        name: 'Amit Kumar'
    })
})

app.get('/about', (req, res) =>
{
    res.render('about', {
        title: 'About us',
        name: 'Amit Kumar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Amit Kumar',
        helpText: 'This is your support page.'
    })
})

app.get('/weather', (req,res) =>
{
    if (!req.query.address) {
        return res.send({error: 'Please enter an address.'})
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        foreCast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error });
            }
            res.send({ location: location, foreCast: data })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Amit Kumar',
        errorMessage: 'Help page does not exist.'
    })
})

app.get('*', (req, res) =>
{
    res.render('404', {
        title: 'Error 404',
        name: 'Amit Kumar',
        errorMessage: 'Page does not exist.'
    })
})
app.listen(3000, () =>
{
    console.log('Server is ON and the port is 3000.')
})