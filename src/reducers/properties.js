const {Map, List, Set} = require('immutable')
    , {node} = require('../utils')
    , {UPDATE_UNIVERSE, NEW_NAMED_NODE} = require('../actions')
    , {rdfs, owl} = require('../namespaces')

const label = node(rdfs('label'), 'label')
  .set('@type', List.of(owl('AnnotationProperty')))

const propertyTypes = Set.of(owl('DatatypeProperty'), owl('ObjectProperty'))

const isProperty = node => (! node.types.intersect(propertyTypes).isEmpty())

module.exports = (properties = Map(), action) => {
  let nextProperties = properties
  switch (action.type) {

    case UPDATE_UNIVERSE:
      nextProperties = action.properties || properties
      break

    case NEW_NAMED_NODE:
      nextProperties = action.node && isProperty(action.node)
        ? properties.set(action.node.id, action.node)
        : properties
      break
  }
  return nextProperties.has(label.id)
    ? nextProperties
    : nextProperties.set(label.id, label)
}
