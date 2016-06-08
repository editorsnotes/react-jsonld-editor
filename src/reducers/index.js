const {JSONLDNode} = require('immutable-jsonld')
    , {Map, List} = require('immutable')
    , {combineReducers} = require('redux')
    , { DELETE_IN
      , UPDATE_CHANGE
      , ACCEPT_CHANGE
      , CANCEL_CHANGE
      , NO_CHANGE
      } = require('../actions')

const node = (node = JSONLDNode(), action) => {
  switch (action.type) {

    case DELETE_IN:
      return node.deleteIn(action.path)

    case ACCEPT_CHANGE:
      return action.change === NO_CHANGE
        ? node : node.setIn(action.path, action.change)

    default:
      return node
  }
}

const universe = (universe = Map(), action) => {
  switch (action.type) {
    default:
      return universe
  }
}

const path = (path = List(), action) => {
  switch (action.type) {

    case DELETE_IN:
    case ACCEPT_CHANGE:
    case CANCEL_CHANGE:
      return List()

    case UPDATE_CHANGE:
      return action.path

    default:
      return path
  }
}

const change = (change = NO_CHANGE, action) => {
  switch (action.type) {

    case ACCEPT_CHANGE:
    case CANCEL_CHANGE:
      return NO_CHANGE

    case UPDATE_CHANGE:
      return action.change

    default:
      return change
  }
}

const input = (input = '', action) => {
  switch (action.type) {

    case ACCEPT_CHANGE:
    case CANCEL_CHANGE:
      return ''

    case UPDATE_CHANGE:
      return action.input

    default:
      return input
  }
}

const selectedSuggestion = (selectedSuggestion = {}, action) => {
  switch (action.type) {

    case ACCEPT_CHANGE:
    case CANCEL_CHANGE:
      return {}

    case UPDATE_CHANGE:
      return action.selectedSuggestion

    default:
      return selectedSuggestion
  }
}

const edit = combineReducers(
  { path
  , change
  , input
  , selectedSuggestion
  }
)

module.exports = combineReducers(
  { node
  , universe
  , edit
  }
)

