#!/usr/bin/env node

'use strict'

const { add, addDev, remove } = require('modify-package-dependencies')

const jsonfile = require('jsonfile')
const fs = require('fs')
const co = require('co')
const copy = require('kopy')

co(function* () {
    // Path of source
    let pathSource = process.cwd() + '/src'    
    // Path of source app
    let pathSourceApp = process.cwd() + '/src/app'
    // Path of package.json
    let pathPackageJson = process.cwd() + '/package.json'
    // Get package.json content
    const packageJsonContent = require(pathPackageJson)
    // Define new packages
    let newPackages = ['body-parser', 'morgan', 'compression', 'cors', 'debug', 'express']
    // Add new packages
    let packageJsonContentUpdated = yield add(packageJsonContent, newPackages)
    // Save package.json
    yield new Promise(function(resolve, reject) {
        jsonfile.writeFile(pathPackageJson, packageJsonContentUpdated, { spaces: 4 }, function (err) {
            if (err)
                reject(err)
            else
                resolve()
        })
    }) 
    // Include project files
    yield copy(__dirname + '/templateApp', pathSourceApp)
    // Include index file
    yield copy(__dirname + '/files', pathSource, {
        move: {
            'index.js.tmp': 'index.js.tmp'
        }
    })
})