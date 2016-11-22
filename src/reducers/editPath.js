const {List} = require('immutable')
    , { SET_IN
      , PUSH_IN
      , DELETE_IN
      , UPDATE_EDITPATH
      } = require('../actions')

module.exports = (editPath = List(), action) => {
  switch (action.type) {

    case SET_IN:
      return action.editPath || editPath

    case PUSH_IN:
      return action.editPath || editPath

    case DELETE_IN:
      return editPath.isEmpty() ? editPath : editPath.pop()

    case UPDATE_EDITPATH:
      return action.path

    default:
      return editPath
  }
}
