'use strict'

const mock = require('mock-require')

/**
 * Mock express
 */
let express = require('express')
if (process.env.LISTEN !== 1) {
    express.application.listen = function () {
        return null
    }
}
mock('express', express)

