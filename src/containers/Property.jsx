const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {List} = require('immutable')
    , Property = require('../components/Property')
    , { isDatatypeProperty, getRangeForDatatypeProperty
      , getRangesForProperty} = require('../universe')
    , { appendBlankNode, appendEmptyType, appendEmptyValue
      } = require('../actions')

const mapStateToProps = (state, {path, label}) => (
  { objects: state.node.getIn(path, List())
  , path
  , label: label || state.labels.get(path.last())
  }
)

const onAppend = (dispatch, path) => numObjects => {
  let property = path.last()
    , fullpath = path.push(numObjects)
  return property === '@type'
    ? dispatch(
        appendEmptyType(fullpath))
    : isDatatypeProperty(property)
      ? dispatch(
          appendEmptyValue(fullpath, getRangeForDatatypeProperty(property)))
      : dispatch(
          appendBlankNode(fullpath, getRangesForProperty(property)))
}

const mapDispatchToProps = (dispatch, {path}) => (
  {onAppend: onAppend(dispatch, path)}
)

module.exports = connect(mapStateToProps, mapDispatchToProps)(Property)
