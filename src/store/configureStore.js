const {createStore} = require('redux')
    , {composeWithDevTools} = require('redux-devtools-extension')
    , reducer = require('../reducers')

module.exports = (initialState = {}) => (
  createStore(reducer, initialState, composeWithDevTools())
)
