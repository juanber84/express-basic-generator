'use strict'

const debug = require('debug')('habitat:bootstrap')
// const morgan = require('morgan')
const compression = require('compression')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')

// const mongooseClient = require('./fn/mongooseClient')

module.exports = app => {
    app.set('x-powered-by', false)
    app.set('etag', false)

    app.use(helmet())
    debug('helmet', true)

    /* istanbul ignore if  */
    // if (process.env.NODE_ENV == 'development') {
    //     app.use(morgan('dev', getMorganConfig()))
    //     debug('morgan', true)
    // }

    app.use(compression())
    debug('compression', true)

    app.use(cors())
    debug('cors', true)

    // // Throw error if no redis connection
    // app.use(function (req, res, next) {
    //     if (mongooseClient.getReadyState() !== 1) {
    //         throw new Error('No Database') // TODO customize
    //     }
    //     next()
    // })
    // debug('database-prevent', true)

    // Parses http body
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    debug('bodyParser', true)

    require('./routes')(app)
    debug('routes', true)

    // TODO error generic
    app.use(function (req, res) {
        res.status(404).json('Not found')
    })
}