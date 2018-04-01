'use strict'

// Test overwrite
require('./mock')

// Require index
let index = require('./../../src/app')

// Export app to test
exports.app = index