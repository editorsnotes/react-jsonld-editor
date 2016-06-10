const {createSelector} = require('reselect')
    , {List, Map} = require('immutable')
    , {JSONLDNode, JSONLDValue} = require('immutable-jsonld')
    , {NO_CHANGE} = require('../actions')

const getNode = state => state.node
const getUniverse = state => state.universe

exports.getLabelResolver = createSelector(
  [getUniverse],
  universe => id => {
    let candidates = universe.getIn(['individuals', id, 'labels'], List())
    return candidates.isEmpty()
      ? id
      : candidates.first().first()
  }
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

const pointsToType = path => (
  path.size > 1
    && Number.isInteger(path.last())
    && path.butLast().last() === '@type'
)

const getDomain = createSelector(
  [getUniverse, getEditPath, isEditingProperties],
  (universe, editpath, isEditingProperties) => pointsToType(editpath)
    ? universe.get('classes', Map())
    : isEditingProperties
        ? universe.get('properties', Map())
        : universe.get('individuals', Map())
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
      : domain.filter(m => m.get('labels', List()).some(matchesInput))
          .entrySeq()
          .map(([id, m]) => (
            {id, label: m.get('labels').find(matchesInput).first()}))
          .toJS()
  }
)

const getRangesForProperty = (predicate, universe) => (
  universe.getIn(['properties', predicate, 'ranges'], List())
)

const getRangeForDatatypeProperty = (predicate, universe) => {
  let ranges = universe.getIn(
    ['datatype-properties', predicate, 'ranges'], List())
  return ranges.isEmpty() ? undefined : ranges.first()
}

exports.getEmptyObjectCreator = createSelector(
  [getUniverse],
  (universe) => {
    return predicate => predicate === '@type'
      ? ''
      : universe.get('datatype-properties', Map()).has(predicate)
          ? JSONLDValue()
              .set('@type', getRangeForDatatypeProperty(predicate, universe))
          : JSONLDNode()
              .set('@type', getRangesForProperty(predicate, universe))
  }
)
