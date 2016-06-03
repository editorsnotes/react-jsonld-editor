const APPEND_BLANK_NODE = 'APPEND_BLANK_NODE'
const APPEND_EMPTY_PROPERTY = 'APPEND_EMPTY_PROPERTY'
const APPEND_EMPTY_TYPE = 'APPEND_EMPTY_TYPE'
const APPEND_EMPTY_VALUE = 'APPEND_EMPTY_VALUE'
const DELETE_IN = 'DELETE_IN'
const FINISH_EDIT = 'FINISH_EDIT'
const REQUEST_SUGGESTIONS = 'REQUEST_SUGGESTIONS'
const SET_IDENTIFIER = 'SET_IDENTIFIER'
const SET_VALUE = 'SET_VALUE'
const START_EDIT_IDENTIFIER = 'START_EDIT_IDENTIFIER'
const START_EDIT_VALUE = 'START_EDIT_VALUE'
const UPDATE_INPUT = 'UPDATE_INPUT'

exports.APPEND_BLANK_NODE = APPEND_BLANK_NODE
exports.APPEND_EMPTY_PROPERTY = APPEND_EMPTY_PROPERTY
exports.APPEND_EMPTY_TYPE = APPEND_EMPTY_TYPE
exports.APPEND_EMPTY_VALUE = APPEND_EMPTY_VALUE
exports.DELETE_IN = DELETE_IN
exports.FINISH_EDIT = FINISH_EDIT
exports.REQUEST_SUGGESTIONS = REQUEST_SUGGESTIONS
exports.SET_IDENTIFIER = SET_IDENTIFIER
exports.SET_VALUE = SET_VALUE
exports.START_EDIT_IDENTIFIER = START_EDIT_IDENTIFIER
exports.START_EDIT_VALUE = START_EDIT_VALUE
exports.UPDATE_INPUT = UPDATE_INPUT

exports.appendBlankNode = (path, nodeTypes) => {
  return {
    type: APPEND_BLANK_NODE,
    path,
    nodeTypes
  }
}

exports.appendEmptyProperty = path => {
  return {
    type: APPEND_EMPTY_PROPERTY,
    path
  }
}

exports.appendEmptyType = path => {
  return {
    type: APPEND_EMPTY_TYPE,
    path
  }
}

exports.appendEmptyValue = (path, valueType) => {
  return {
    type: APPEND_EMPTY_VALUE,
    path,
    valueType
  }
}

exports.deleteIn = path => {
  return {
    type: DELETE_IN,
    path
  }
}

exports.finishEdit = () => {
  return {
    type: FINISH_EDIT
  }
}

exports.requestSuggestions = (input, domain) => {
  return {
    type: REQUEST_SUGGESTIONS,
    input,
    domain
  }
}

exports.setIdentifier = (path, id, label) => {
  return {
    type: SET_IDENTIFIER,
    path,
    id,
    label
  }
}

exports.setValue = (path, value) => {
  return {
    type: SET_VALUE,
    path,
    value
  }
}

exports.startEditIdentifier = (path, input, domain) => {
  return {
    type: START_EDIT_IDENTIFIER,
    path,
    input,
    domain,
  }
}

exports.startEditValue = (path, input) => {
  return {
    type: START_EDIT_VALUE,
    path,
    input
  }
}

exports.updateInput = input => {
  return {
    type: UPDATE_INPUT,
    input
  }
}

