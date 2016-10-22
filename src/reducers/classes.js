const {Map} = require('immutable')
    , {UPDATE_UNIVERSE, NEW_NAMED_NODE} = require('../actions')
    , {rdfs} = require('../namespaces')

module.exports = (classes = Map(), action) => {
  switch (action.type) {
    case UPDATE_UNIVERSE:
      return action.classes || classes

    case NEW_NAMED_NODE:
      return action.node && action.node.types.includes(rdfs('Class'))
        ? classes.set(action.node.id, action.node)
        : classes

    default:
      return classes
  }
}

