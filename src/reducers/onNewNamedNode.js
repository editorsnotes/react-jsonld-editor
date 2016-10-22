const { NEW_NAMED_NODE
      , UPDATE_ON_NEW_NAMED_NODE
      } = require('../actions')

module.exports = (onNewNamedNode = () => {}, action) => {
  switch (action.type) {

    case NEW_NAMED_NODE:
      onNewNamedNode(action.node)
      return onNewNamedNode

    case UPDATE_ON_NEW_NAMED_NODE:
      return action.onNewNamedNode || onNewNamedNode

    default:
      return onNewNamedNode
  }
}
