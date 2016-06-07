const DELETE_IN = 'DELETE_IN'
const UPDATE_CHANGE = 'UPDATE_CHANGE'
const ACCEPT_CHANGE = 'ACCEPT_CHANGE'
const CANCEL_CHANGE = 'CANCEL_CHANGE'

exports.DELETE_IN = DELETE_IN
exports.UPDATE_CHANGE = UPDATE_CHANGE
exports.ACCEPT_CHANGE = ACCEPT_CHANGE
exports.CANCEL_CHANGE = CANCEL_CHANGE

exports.deleteIn = path => (
  { type: DELETE_IN
  , path
  }
)

exports.updateChange = (path, change, input = '', selectedSuggestion = {}) => (
  { type: UPDATE_CHANGE
  , path
  , change
  , input
  , selectedSuggestion
  }
)

exports.acceptChange = (path, change) => (
  { type: ACCEPT_CHANGE
  , path
  , change
  }
)

exports.cancelChange = () => (
  { type: CANCEL_CHANGE }
)

exports.NO_CHANGE = Symbol('NO CHANGE')
