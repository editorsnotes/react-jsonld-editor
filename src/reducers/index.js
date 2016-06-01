const {JSONLDNode, JSONLDValue} = require('immutable-jsonld')
    , {Map, List} = require('immutable')
    , {combineReducers} = require('redux')
    , { isDatatypeProperty, getRangesForProperty, getLabelForID
      , getResourcesWithLabelsMatching
      } = require('../universe')
    , { SET_IDENTIFIER, SET_VALUE, START_EDIT_IDENTIFIER, START_EDIT_VALUE
      , FINISH_EDIT, DELETE_IN, APPEND_TO, UPDATE_INPUT, REQUEST_SUGGESTIONS
      } = require('../actions')

const newValue = property => {
  let value = JSONLDValue(), ranges = getRangesForProperty(property)
  return ranges.isEmpty() ? value : value.set('@type', ranges.first())
}

const newNode = property => {
  let node = JSONLDNode(), ranges = getRangesForProperty(property)
  return ranges.isEmpty()
    ? node
    : node.set('@types', ranges)
}

const newObject = property => property === '@type'
  ? ''
  : isDatatypeProperty(property)
    ? newValue(property)
    : newNode(property)

const node = (node = JSONLDNode(), action) => {
  switch (action.type) {
    case APPEND_TO:
      let path = action.path.butLast()
        , object = newObject(path.last())
      return node.setIn(path, node.getIn(path, List()).push(object))
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
    case SET_IDENTIFIER:
        return getLabelForID(action.id, labels)
    default:
      return labels
  }
}

const editPath = (editPath = List(), action) => {
  switch (action.type) {
    case START_EDIT_IDENTIFIER:
    case START_EDIT_VALUE:
      return action.path
    case FINISH_EDIT:
      return List()
    case APPEND_TO:
      return action.path
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

