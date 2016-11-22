const {JSONLDNode} = require('immutable-jsonld')
    , { SET_IN
      , PUSH_IN
      , DELETE_IN
      } = require('../actions')

module.exports = (node = JSONLDNode(), action) => {
  switch (action.type) {

    case DELETE_IN:
      return node.deleteIn(action.path)

    case SET_IN:
      return node.setIn(action.path, action.value)

    case PUSH_IN:
      return node.updateIn(
        action.path.butLast(),
        node => node.push(action.path.last(), action.value)
      )

    default:
      return node
  }
}
