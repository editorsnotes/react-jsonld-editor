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

const pointsToType = path => (
  path.size > 1
    && Number.isInteger(path.last())
    && path.butLast().last() === '@type'
)

const getDomain = createSelector(
  [getClasses, getProperties, getIndividuals, getEditPath, isEditingProperties],
  (classes, properties, individuals, editpath, isEditingProperties) => (
    pointsToType(editpath)
      ? classes
      : isEditingProperties
          ? properties
          : individuals
  )
)

exports.getLabelResolver = createSelector(
  [getClasses, getProperties, getIndividuals],
  (classes, properties, individuals) => id => {
    const domain = List.of(classes, properties, individuals)
      .find(domain => domain.has(id))
    return domain ? (domain.get(id).preferredLabel() || id) : id
  }
)

exports.getEditedNode = createSelector(
  [getNode, getEditPath, getChange],
  (node, editpath, change) => change === NO_CHANGE
    ? node
    : node.setIn(editpath, change)
)

const matches = (inputValue, inputLength) => label => (
  label.first().toLowerCase().slice(0, inputLength) === inputValue
)

exports.getSuggestions = createSelector(
  [getInput, getDomain],
  (input, domain) => {

    const inputValue = String(input).trim().toLowerCase()
    const inputLength = inputValue.length
    const matchesInput = matches(inputValue, inputLength)
    return inputLength === 0
      ? []
      : domain.valueSeq()
          .filter(node => matchesInput(node.preferredLabel()))
          .map(node => ({id: node.id, label: node.preferredLabel()}))
          .toJS()
  }
)

const getRangeForDatatypeProperty = property => {
  let ranges = property.get(rdfs('range'), List())
  return ranges.isEmpty() ? undefined : ranges.first().id
}

const createObject = property => (
  property.types.includes(owl('DatatypeProperty'))
    ? JSONLDValue().set('@type', getRangeForDatatypeProperty(property))
    : JSONLDNode().set('@type', property.get(rdfs('range'), List()))
)

exports.getEmptyObjectCreator = createSelector(
  [getProperties],
  properties => predicate => predicate === '@type'
      ? '' // empty string
      : properties.has(predicate)
          ? createObject(properties.get(predicate))
          : JSONLDNode()
)
