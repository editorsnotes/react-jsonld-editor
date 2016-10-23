const {JSONLDNode} = require('immutable-jsonld')
    , {Map, List} = require('immutable')
    , {combineReducers} = require('redux')
    , { UPDATE_UNIVERSE
      , SET_IN
      , DELETE_IN
      , UPDATE_EDITPATH
      , UPDATE_SHOWPATH
      , UPDATE_INPUT
      , UPDATE_SUGGESTIONS
      , TOGGLE_EDITING_PROPERTIES
      } = require('../actions')

const node = (node = JSONLDNode(), action) => {
  switch (action.type) {

    case DELETE_IN:
      return node.deleteIn(action.path)

    case SET_IN:
      return node.setIn(action.path, action.value)

    default:
      return node
  }
}

const datatypes = (datatypes = Map(), action) => {
  switch (action.type) {
    case UPDATE_UNIVERSE:
      return action.datatypes || datatypes

    default:
      return datatypes
  }
}

const languages = (languages = Map(), action) => {
  switch (action.type) {
    case UPDATE_UNIVERSE:
      return action.languages || languages

    default:
      return languages
  }
}

const editPath = (editPath = List(), action) => {
  switch (action.type) {

    case SET_IN:
      return action.editPath || editPath

    case DELETE_IN:
      return editPath.isEmpty() ? editPath : editPath.pop()

    case UPDATE_EDITPATH:
      return action.path

    default:
      return editPath
  }
}

const rootNodePath = (rootNodePath = List(), action) => {
  switch (action.type) {

    case UPDATE_SHOWPATH:
      return action.path

    default:
      return rootNodePath
  }
}

const input = (input = '', action) => {
  switch (action.type) {

    case UPDATE_INPUT:
    case UPDATE_EDITPATH:
    case SET_IN:
      return action.input || ''

    default:
      return input
  }
}

const suggestions = (suggestions = [], action) => {
  switch (action.type) {

    case UPDATE_SUGGESTIONS:
      return action.suggestions

    default:
      return suggestions
  }
}

const isEditingProperties = (isEditingProperties = false, action) => {
  switch(action.type) {

    case TOGGLE_EDITING_PROPERTIES:
      return (! isEditingProperties)

    default:
      return isEditingProperties
  }
}

module.exports = combineReducers(
  { node
  , datatypes
  , languages
  , editPath
  , rootNodePath
  , input
  , suggestions
  , isEditingProperties
  , individuals: require('./individuals')
  , classes: require('./classes')
  , properties: require('./properties')
  , mintID: require('./mintID')
  , onNewNamedNode: require('./onNewNamedNode')
  }
)

