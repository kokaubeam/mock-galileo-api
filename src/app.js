const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')

const routes = require('./routes')

const app = express()

const isProduction = app.get('env') === 'production'

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', routes)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)

  if (isProduction) {
    return res.send()
  }

  res.send({
    message: error.message,
    error
  })
})

module.exports = app
