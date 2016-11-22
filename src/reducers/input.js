const { UPDATE_INPUT
      , UPDATE_EDITPATH
      , SET_IN
      , PUSH_IN
      } = require('../actions')

module.exports = (input = '', action) => {
  switch (action.type) {

    case UPDATE_INPUT:
    case UPDATE_EDITPATH:
    case SET_IN:
    case PUSH_IN:
      return action.input || ''

    default:
      return input
  }
}
