'use strict'

const React = require('react')
    , ReactDOM = require('react-dom')
    , Index = require('./Index.jsx')

const mount = document.createElement('div')
document.body.appendChild(mount)

ReactDOM.render(<Index/>, mount)
