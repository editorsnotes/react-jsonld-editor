const {List} = require('immutable')

const SET_IN = 'SET_IN'
const DELETE_IN = 'DELETE_IN'
const NEW_NAMED_NODE = 'NEW_NAMED_NODE'
const UPDATE_EDITPATH = 'UPDATE_EDITPATH'
const UPDATE_SHOWPATH = 'UPDATE_SHOWPATH'
const UPDATE_INPUT = 'UPDATE_INPUT'
const UPDATE_SUGGESTIONS = 'UPDATE_SUGGESTIONS'
const UPDATE_UNIVERSE = 'UPDATE_UNIVERSE'
const UPDATE_MINT_ID = 'UPDATE_MINT_ID'
const UPDATE_ON_NEW_NAMED_NODE = 'UPDATE_ON_NEW_NAMED_NODE'
const TOGGLE_EDITING_PROPERTIES = 'TOGGLE_EDITING_PROPERTIES'

exports.SET_IN = SET_IN
exports.DELETE_IN = DELETE_IN
exports.NEW_NAMED_NODE = NEW_NAMED_NODE
exports.UPDATE_EDITPATH = UPDATE_EDITPATH
exports.UPDATE_SHOWPATH = UPDATE_SHOWPATH
exports.UPDATE_INPUT = UPDATE_INPUT
exports.UPDATE_SUGGESTIONS = UPDATE_SUGGESTIONS
exports.UPDATE_UNIVERSE = UPDATE_UNIVERSE
exports.UPDATE_MINT_ID = UPDATE_MINT_ID
exports.UPDATE_ON_NEW_NAMED_NODE = UPDATE_ON_NEW_NAMED_NODE
exports.TOGGLE_EDITING_PROPERTIES = TOGGLE_EDITING_PROPERTIES

const setIn = (path, value, {input, editPath} = {}) => (
  { type: SET_IN
  , path
  , value
  , input
  , editPath
  }
)
exports.setIn = setIn

exports.updateNode = node => setIn(List(), node)

exports.deleteIn = path => (
  { type: DELETE_IN
  , path
  }
)

exports.newNamedNode = node => (
  { type: NEW_NAMED_NODE
  , node
  }
)

exports.updateEditPath = (path, input) => (
  { type: UPDATE_EDITPATH
  , path
  , input
  }
)

exports.updateRootNodePath = path => (
  { type: UPDATE_SHOWPATH
  , path
  }
)

exports.updateInput = input => (
  { type: UPDATE_INPUT
  , input
  }
)

exports.updateSuggestions = suggestions => (
  { type: UPDATE_SUGGESTIONS
  , suggestions
  }
)

exports.updateUniverse = domains => (
  { type: UPDATE_UNIVERSE
  , ...domains
  }
)

exports.updateMintID = mintID => (
  { type: UPDATE_MINT_ID
  , mintID
  }
)

exports.updateOnNewNamedNode = onNewNamedNode => (
  { type: UPDATE_ON_NEW_NAMED_NODE
  , onNewNamedNode
  }
)

exports.toggleEditingProperties = () => (
  { type: TOGGLE_EDITING_PROPERTIES
  }
)
