const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const app = express()
const log = console.log
var port = process.env.PORT || 4000

// Body parser: https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// CORS on ExpressJS: https://github.com/expressjs/cors
app.use(cors())
// Cookie parser: https://github.com/expressjs/cookie-parser
app.use(cookieParser())

// For fontend route
// var frontendDir = path.join(path.dirname(path.dirname(__dirname)), 'frontend')

// For heroku
var frontendDir = path.join(path.dirname(__dirname), 'frontend')
app.use('/home', express.static(path.join(frontendDir, 'build')))
app.get('/home', function(req, res) {
  res.sendFile(path.join(frontendDir, 'build', 'index.html'))
})
app.get('/', function(req, res) {
  res.redirect('/home')
})

app.listen(port, function() {
  log('Server listening at port %d', port)
})


import Weather from './weather/'
app.post('/weather', function(req, res) {
  try {
    // Get the city and date from the request
  let city = req.body.queryResult.parameters['geo-city'] // city is a required param

  // Get the date for the weather forecast (if present)
  let date = ''
  if (req.body.queryResult.parameters['date']) {
    date = req.body.queryResult.parameters['date']
    console.log('Date: ' + date)
  }

  // Call the weather API
  new Weather().callWeatherApi(city, date)
    .then(output => {
      res.json({ fulfillmentText: output }) // Return the results of the weather API to Dialogflow
    })
    .catch(() => {
      res.json({ fulfillmentText: `I don't know the weather but I hope it's good!` })
    })
  } catch (error) {
    res.json({ fulfillmentText: `I don't know the weather but I hope it's good!` })
  }
  
})