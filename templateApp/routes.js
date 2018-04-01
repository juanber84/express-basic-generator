'use strict'

const mainController = require('./controllers/mainController')

module.exports = app => {
    app.get('/', mainController.index)
}