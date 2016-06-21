const {List} = require('immutable')

const UPDATE_CLASSES = 'UPDATE_CLASSES'
const UPDATE_PROPERTIES = 'UPDATE_PROPERTIES'
const UPDATE_INDIVIDUALS = 'UPDATE_INDIVIDUALS'
const DELETE_IN = 'DELETE_IN'
const UPDATE_INPUT = 'UPDATE_INPUT'
const UPDATE_SELECTED_SUGGESTION = 'UPDATE_SELECTED_SUGGESTION'
const UPDATE_CHANGE = 'UPDATE_CHANGE'
const ACCEPT_CHANGE = 'ACCEPT_CHANGE'
const CANCEL_CHANGE = 'CANCEL_CHANGE'

exports.UPDATE_CLASSES = UPDATE_CLASSES
exports.UPDATE_PROPERTIES = UPDATE_PROPERTIES
exports.UPDATE_INDIVIDUALS = UPDATE_INDIVIDUALS
exports.DELETE_IN = DELETE_IN
exports.UPDATE_INPUT = UPDATE_INPUT
exports.UPDATE_SELECTED_SUGGESTION = UPDATE_SELECTED_SUGGESTION
exports.UPDATE_CHANGE = UPDATE_CHANGE
exports.ACCEPT_CHANGE = ACCEPT_CHANGE
exports.CANCEL_CHANGE = CANCEL_CHANGE

exports.updateClasses = classes => (
  { type: UPDATE_CLASSES
  , classes
  }
)

exports.updateProperties = properties => (
  { type: UPDATE_PROPERTIES
  , properties
  }
)

exports.updateIndividuals = individuals => (
  { type: UPDATE_INDIVIDUALS
  , individuals
  }
)

exports.deleteIn = path => (
  { type: DELETE_IN
  , path
  }
)

exports.updateInput = input => (
  { type: UPDATE_INPUT
  , input
  }
)

exports.updateSelectedSuggestion = suggestion => (
  { type: UPDATE_SELECTED_SUGGESTION
  , suggestion
  }
)

const updateChange = (
  path,
  change,
  editingProperties = false,
  input = '',
  suggestion = {}) => (
  { type: UPDATE_CHANGE
  , path
  , change
  , editingProperties
  , input
  , suggestion
  }
)
exports.updateChange = updateChange

exports.startEditingProperties = (path, change) => updateChange(
  path, change, true
)

exports.deleteProperty = (path, change) => updateChange(
  path.butLast(), change.delete(path.last()), true
)

exports.appendProperty = (path, change, predicate) => updateChange(
  path, change.update(predicate, (list = List()) => list), true
)

const acceptChange = (path, change) => (
  { type: ACCEPT_CHANGE
  , path
  , change
  }
)
exports.acceptChange = acceptChange

exports.updateNode = node => acceptChange(List(), node)

exports.cancelChange = () => (
  { type: CANCEL_CHANGE }
)

exports.NO_CHANGE = Symbol('NO CHANGE')
