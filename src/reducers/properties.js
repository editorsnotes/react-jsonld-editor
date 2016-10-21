const {Map, List} = require('immutable')
    , {node} = require('../utils')
    , {UPDATE_UNIVERSE} = require('../actions')
    , {rdfs, owl} = require('../namespaces')

const label = node(rdfs('label'), 'label')
  .set('@type', List.of(owl('AnnotationProperty')))

module.exports = (properties = Map(), action) => (
  action.type === UPDATE_UNIVERSE && action.properties
    ? action.properties
    : properties
).set(label.id, label)
