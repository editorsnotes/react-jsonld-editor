const {createSelector} = require('reselect')
    , {Map, List, Seq} = require('immutable')
    , {JSONLDNode, JSONLDValue} = require('immutable-jsonld')
    , {rdfs, owl} = require('../namespaces')

const getNode = state => state.node
const getClasses = state => state.classes
const getProperties = state => state.properties
const getIndividuals = state => state.individuals
const getDatatypes = state => state.datatypes
const getLanguages = state => state.languages

exports.getNode = getNode
exports.getProperties = getProperties
exports.getIndividuals = getIndividuals
exports.getLanguages = getLanguages

const getLabels = createSelector(
  [getClasses, getProperties, getIndividuals, getDatatypes, getLanguages],
  (...domains) => Map(
    Seq(domains)
      .flatMap(domain => domain.valueSeq())
      .map(node => [node.id, node.preferredLabel()])
  )
)

exports.getLabelResolver = createSelector(
  [getLabels],
  labels => id => labels.has(id) ? labels.get(id).value : id
)

const getEditPath = state => state.editPath
const getRootNodePath = state => state.rootNodePath
const getInput = state => state.input
const getSuggestions = state => state.suggestions
const isEditingProperties = state => state.isEditingProperties

exports.getEditPath = getEditPath
exports.getRootNodePath = getRootNodePath
exports.getInput = getInput
exports.getSuggestions = getSuggestions
exports.isEditingProperties = isEditingProperties

const matches = (inputValue, inputLength) => label => label
  ? label.value.toLowerCase().slice(0, inputLength) === inputValue
  : false

const findSuggestions = (input, domain, labels, alwaysSuggest = false) => {
  const inputValue = String(input).trim().toLowerCase()
  const inputLength = inputValue.length
  const matchesInput = matches(inputValue, inputLength)
  const matchingNodes = inputLength === 0
    ? alwaysSuggest ? domain.valueSeq() : Seq()
    : domain.valueSeq().filter(node => matchesInput(labels.get(node.id)))
  return matchingNodes
    .map(node => ({id: node.id, label: labels.get(node.id).value}))
    .sort(({label: a}, {label: b}) => a.localeCompare(b))
    .toArray()
}

const createSuggester = (getter, alwaysSuggest) => createSelector(
  [getter, getLabels],
  (resources, labels) => input => findSuggestions(
    input, resources, labels, alwaysSuggest)
)

exports.getClassSuggester = createSuggester(getClasses)
exports.getPropertySuggester = createSuggester(getProperties)
exports.getIndividualSuggester = createSuggester(getIndividuals)
exports.getDatatypeSuggester = createSuggester(getDatatypes, true)
exports.getLanguageSuggester = createSuggester(getLanguages)

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
    : JSONLDValue()
)

exports.getPredicateRangeFinder = createSelector(
  [getProperties],
  properties => predicate => properties.has(predicate)
    ? properties
        .get(predicate)
        .get(rdfs('range'), List())
        .map(node => node.id)
    : List()
)
