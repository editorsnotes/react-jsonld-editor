const {JSONLDNode, JSONLDValue} = require('immutable-jsonld')
    , {Map, List} = require('immutable')
    , {combineReducers} = require('redux')
    , { getLabelForID , getResourcesWithLabelsMatching} = require('../universe')
    , { APPEND_BLANK_NODE, APPEND_EMPTY_PROPERTY, APPEND_EMPTY_TYPE
      , APPEND_EMPTY_VALUE, SET_IDENTIFIER, SET_VALUE, START_EDIT_IDENTIFIER
      , START_EDIT_VALUE, FINISH_EDIT, DELETE_IN, UPDATE_INPUT
      , REQUEST_SUGGESTIONS } = require('../actions')

const appendTo = (node, path, object) => node.setIn(
  path, node.getIn(path, List()).push(object))

const node = (node = JSONLDNode(), action) => {
  switch (action.type) {
    case APPEND_BLANK_NODE:
      return appendTo(
        node, action.path.butLast(),
        JSONLDNode().set('@type', action.nodeTypes))
    case APPEND_EMPTY_PROPERTY:
      return node.hasIn(action.path) ? node : node.setIn(action.path, List())
    case APPEND_EMPTY_TYPE:
      return appendTo(node, action.path.butLast(), '')
    case APPEND_EMPTY_VALUE:
      return appendTo(
        node, action.path.butLast(),
        JSONLDValue().set('@type', action.valueType))
    case SET_IDENTIFIER:
      return node.setIn(action.path, action.id)
    case SET_VALUE:
      return node.setIn(action.path, action.value)
    case DELETE_IN:
      return node.deleteIn(action.path)
    default:
      return node
  }
}

const labels = (labels = Map(), action) => {
  switch (action.type) {
    case APPEND_BLANK_NODE:
      return action.nodeTypes.reduce(
        (labels, type) => getLabelForID(type, labels), labels)
    case SET_IDENTIFIER:
      return getLabelForID(action.id, labels)
    default:
      return labels
  }
}

const editPath = (editPath = List(), action) => {
  switch (action.type) {
    case APPEND_BLANK_NODE:
      return action.path.push('@id')
    case APPEND_EMPTY_PROPERTY:
    case APPEND_EMPTY_TYPE:
    case APPEND_EMPTY_VALUE:
    case START_EDIT_IDENTIFIER:
    case START_EDIT_VALUE:
      return action.path
    case FINISH_EDIT:
      return List()
    default:
      return editPath
  }
}

const input = (input = '', action) => {
  switch (action.type) {
    case START_EDIT_IDENTIFIER:
    case START_EDIT_VALUE:
    case UPDATE_INPUT:
      return action.input
    case SET_IDENTIFIER:
      return action.label
    case SET_VALUE:
      return action.value.value
    case FINISH_EDIT:
      return ''
    default:
      return input
  }
}

const suggestions = (suggestions = [], action) => {
  switch (action.type) {
    case START_EDIT_IDENTIFIER:
    case REQUEST_SUGGESTIONS:
      return getResourcesWithLabelsMatching(action.input, action.domain)
    case FINISH_EDIT:
      return []
    default:
      return suggestions
  }
}

module.exports = combineReducers({node, labels, editPath, input, suggestions})

