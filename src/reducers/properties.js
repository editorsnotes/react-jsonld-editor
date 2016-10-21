const {Map, List} = require('immutable')
    , {node} = require('../utils')
    , {UPDATE_UNIVERSE} = require('../actions')
    , {rdfs, owl} = require('../namespaces')

const label = node(rdfs('label'), 'label')
  .set('@type', List.of(owl('AnnotationProperty')))

module.exports = (properties = Map.of(label.id, label), action) => {
  switch (action.type) {

    case UPDATE_UNIVERSE:
      return action.properties
        ? action.properties.set(label.id, label)
        : properties

    default:
      return properties
  }
}

