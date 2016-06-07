const {createSelector} = require('reselect')
    , {NO_CHANGE} = require('../actions')
    , { INDIVIDUALS, CLASSES, PROPERTIES
      , getResourcesWithLabelsMatching } = require('../universe')

const getNode = state => state.node
const getEditPath = state => state.edit.path
const getEditChange = state => state.edit.change
const getEditInput = state => state.edit.input

const pointsToType = path => (
  path.size > 1
    && Number.isInteger(path.last())
    && path.butLast().last() === '@type'
)

const pointsToProperty = path => (
  path.size > 0
    && (! Number.isInteger(path.last()))
    && (path.last() !== '@id')
)

const getDomain = createSelector(
  [getEditPath],
  path => pointsToType(path)
    ? CLASSES
    : pointsToProperty(path)
        ? PROPERTIES
        : INDIVIDUALS
)

exports.getEditPath = getEditPath
exports.getEditChange = getEditChange
exports.getEditInput = getEditInput

exports.getEditedNode = createSelector(
  [getNode, getEditPath, getEditChange],
  (node, path, change) => change === NO_CHANGE
    ? node
    : node.setIn(path, change)
)

exports.getSuggestions = createSelector(
  [getEditInput, getDomain],
  (input, domain) => getResourcesWithLabelsMatching(input, domain)
)
