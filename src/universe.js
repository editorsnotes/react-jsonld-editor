const {fromJS, List, Map} = require('immutable')

const INDIVIDUALS = 'INDIVIDUALS'
    , CLASSES = 'CLASSES'
    , PROPERTIES = 'PROPERTIES'
    , DATATYPE_PROPERTIES = 'DATATYPE_PROPERTIES'

const U = fromJS(
  { [INDIVIDUALS]: require('../data/indexes/individuals.json')
  , [CLASSES]: require('../data/indexes/classes.json')
  , [PROPERTIES]: require('../data/indexes/properties.json')
  , [DATATYPE_PROPERTIES]: require('../data/indexes/datatype-properties.json')
  }
)

const get = domain => {
  switch (domain) {
    case INDIVIDUALS:
    case CLASSES:
    case PROPERTIES:
    case DATATYPE_PROPERTIES:
      return U.get(domain, Map())
    default:
      throw new Error(`Unknown domain: ${domain}`)
  }
}

const getLabelForID = (id, labels = Map(), domain = INDIVIDUALS) => {
  if (labels.has(id)) return labels
  let candidateLabels = get(domain).getIn([id, 'labels'], List())
  return candidateLabels.isEmpty()
    ? labels
    : labels.set(id, candidateLabels.first().first())
}

const getLabelsForNode = (node, labels) => node.reduce(
  (labels, value, key) => {
    switch (key) {
      case '@id':
        return getLabelForID(value, labels)
      case '@type':
        return value.reduce(
          (labels, type) => getLabelForID(type, labels, CLASSES), labels)
      default:
        return getLabelForID(key, labels, PROPERTIES)
    }
  }, labels)

const matches = (inputValue, inputLength) => label => (
  label.first().toLowerCase().slice(0, inputLength) === inputValue
)

const getResourcesWithLabelsMatching = (input, domain = INDIVIDUALS) => {
  const inputValue = input.trim().toLowerCase()
  const inputLength = inputValue.length
  const matchesInput = matches(inputValue, inputLength)
  return inputLength === 0
    ? []
    : get(domain)
        .filter(m => m.get('labels', List()).some(matchesInput))
        .entrySeq()
        .map(([id, m]) => (
          {id, label: m.get('labels').find(matchesInput).first()}))
        .toJS()
}

module.exports = (
  { INDIVIDUALS, CLASSES, PROPERTIES, DATATYPE_PROPERTIES
  , DOMAINS: [INDIVIDUALS, CLASSES, PROPERTIES, DATATYPE_PROPERTIES]

  , getLabelForID

  , getResourcesWithLabelsMatching

  , isDatatypeProperty: property => get(DATATYPE_PROPERTIES).has(property)

  , getAllLabelsForNode: (node, labels = Map()) => node.descendantNodes()
      .reduce((labels, pair) => getLabelsForNode(pair.last(), labels), labels)

  , getRangesForProperty:
      property => get(PROPERTIES).getIn([property, 'ranges'], List())

  , getRangeForDatatypeProperty: property => {
      let ranges = get(DATATYPE_PROPERTIES).getIn([property, 'ranges'], List())
      return ranges.isEmpty() ? undefined : ranges.first()
    }
  }
)
