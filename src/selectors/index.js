const {createSelector} = require('reselect')
    , {List} = require('immutable')
    , {JSONLDNode, JSONLDValue} = require('immutable-jsonld')
    , {NO_CHANGE} = require('../actions')
    , {rdfs, owl} = require('../namespaces')

const getNode = state => state.node
const getClasses = state => state.classes
const getProperties = state => state.properties
const getIndividuals = state => state.individuals

exports.getClasses = getClasses
exports.getProperties = getProperties
exports.getIndividuals = getIndividuals

const getEditPath = state => state.editpath
const getChange = state => state.change
const getInput = state => state.input
const getSelectedSuggestion = state => state.selectedSuggestion
const isEditingProperties = state => state.editingProperties

exports.getEditPath = getEditPath
exports.getChange = getChange
exports.getInput = getInput
exports.getSelectedSuggestion = getSelectedSuggestion
exports.isEditingProperties = isEditingProperties

exports.getLabelResolver = createSelector(
  [getClasses, getProperties, getIndividuals],
  (classes, properties, individuals) => id => {
    const domain = List.of(classes, properties, individuals)
      .find(domain => domain.has(id))
    if (! domain) return id
    const label = domain.get(id).preferredLabel()
    return label ? label.value : id
  }
)

exports.getEditedNode = createSelector(
  [getNode, getEditPath, getChange],
  (node, editpath, change) => change === NO_CHANGE
    ? node
    : node.setIn(editpath, change)
)

const createObject = property => {
  const types = property.get(rdfs('range'), List()).map(node => node.id)
  return property.types.includes(owl('DatatypeProperty'))
    ? JSONLDValue().set('@type', types.first())
    : JSONLDNode().set('@type', types)
}

exports.getEmptyObjectCreator = createSelector(
  [getProperties],
  properties => predicate => properties.has(predicate)
    ? createObject(properties.get(predicate))
    : JSONLDNode()
)
