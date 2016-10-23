const {Set, Map} = require('immutable')
    , {UPDATE_UNIVERSE, NEW_NAMED_NODE} = require('../actions')
    , {rdf, rdfs, owl} = require('../namespaces')

const nonIndividualTypes = Set.of(
  owl('AnnotationProperty'),
  owl('Class'),
  owl('DatatypeProperty'),
  owl('ObjectProperty'),
  owl('Ontology'),
  owl('OntologyProperty'),
  rdf('Property'),
  rdfs('Class'),
  rdfs('Datatype'),
  rdfs('Literal')
)

const isIndividual = node => node.types.intersect(nonIndividualTypes).isEmpty()

module.exports = (individuals = Map(), action) => {
  switch (action.type) {
    case UPDATE_UNIVERSE:
      return action.individuals || individuals

    case NEW_NAMED_NODE:
      return action.node && action.node.id && isIndividual(action.node)
        ? individuals.set(action.node.id, action.node)
        : individuals

    default:
      return individuals
  }
}
