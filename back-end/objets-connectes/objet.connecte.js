'use strict'

const { parentPort } = require('worker_threads')

let increment = 0
while (increment !== Math.pow(5, 10)) {
    increment++
}

const message = 'Finish : ' + increment

parentPort.postMessage(message)