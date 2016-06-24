const {createStore} = require('redux')
    , reducer = require('../reducers')

module.exports = (initialState = {}) => createStore(reducer, initialState)

