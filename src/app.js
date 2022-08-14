const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utlis/geocode')
const forecast = require('./utlis/forecast')

const app = express()

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const veiwChang = path.join(__dirname, '../tamplates/views')
const partial = path.join(__dirname, '../tamplates/partials')

app.set('view engine', 'hbs')
app.set('views', veiwChang)
hbs.registerPartials(partial)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'parmar utsav'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Utsav Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: "Parmar"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Error 404'
        })
    }
    // else {

    geocode(req.query.address, (error, { latitude, longtude, place_name } = {}) => {
        if (error) {
            res.send({
                error: error
            })
        }
        else {
            forecast(latitude, longtude, (error, data, colud) => {
                if (error) {
                    return res.send(error)
                } else {
                    res.send({
                        place_name: place_name,
                        Temperature: data,
                        main: colud
                    })
                }
            })
        }
    })
    // }
})
app.get('*', (req, res) => {
    res.render('ErrorPage', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: "Parmar"
    })
    console.log("123123");
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})