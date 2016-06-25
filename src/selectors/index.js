const {createSelector} = require('reselect')
    , {Map, List, Seq} = require('immutable')
    , {JSONLDNode, JSONLDValue} = require('immutable-jsonld')
    , {NO_CHANGE} = require('../actions')
    , {rdfs, owl} = require('../namespaces')

const getNode = state => state.node
const getClasses = state => state.classes
const getProperties = state => state.properties
const getIndividuals = state => state.individuals

exports.canEditTypes = state => (! getClasses(state).isEmpty())
exports.canEditProperties = state => (! getProperties(state).isEmpty())

const getLabels = createSelector(
  [getClasses, getProperties, getIndividuals],
  (...domains) => Map(
    Seq(domains)
      .flatMap(domain => domain.valueSeq())
      .map(node => [node.id, node.preferredLabel()])
  ).set(rdfs('label'), JSONLDValue( // always need this one
    {'@value': 'label', '@language': 'en'}))
)

exports.getLabelResolver = createSelector(
  [getLabels],
  labels => id => labels.has(id) ? labels.get(id).value : id
)

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

const matches = (inputValue, inputLength) => label => label
  ? label.value.toLowerCase().slice(0, inputLength) === inputValue
  : false

const getSuggestions = (input, domain, labels, labelTransform = x => x) => {
  const inputValue = String(input).trim().toLowerCase()
  const inputLength = inputValue.length
  const matchesInput = matches(inputValue, inputLength)
  return inputLength === 0
    ? []
    : domain.valueSeq()
        .filter(node => matchesInput(labels.get(node.id)))
        .map(node => ({id: node.id, label: labels.get(node.id).value}))
        .map(({id, label}) => ({id, label: labelTransform(label)}))
        .toArray()
}

exports.getClassSuggestions = createSelector(
  [getInput, getClasses, getLabels],
  (input, classes, labels) => getSuggestions(input, classes, labels)
)
exports.getPropertySuggestions = createSelector(
  [getInput, getProperties, getLabels],
  (input, properties, labels) => getSuggestions(
    input, properties, labels, label => label.toLowerCase())
)
exports.getIndividualSuggestions = createSelector(
  [getInput, getIndividuals, getLabels],
  (input, individuals, labels) => getSuggestions(input, individuals, labels)
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
