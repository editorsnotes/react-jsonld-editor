const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {List} = require('immutable')
    , {JSONLDNode, JSONLDValue} = require('immutable-jsonld')
    , Property = require('../components/Property')
    , { isDatatypeProperty
      , getRangeForDatatypeProperty
      , getRangesForProperty
      } = require('../universe')
    , {deleteIn, updateChange} = require('../actions')
    , {getEditedNode} = require('../selectors')

const mapStateToProps = (state, {path, label}) => (
  { objects: getEditedNode(state).getIn(path, List())
  , path
  , label: label || state.labels.get(path.last())
  }
)

const onAppend = (dispatch, path) => numObjects => {
  let property = path.last()
    , fullpath = path.push(numObjects)
    , change = property === '@type'
        ? ''
        : isDatatypeProperty(property)
            ? JSONLDValue().set('@type', getRangeForDatatypeProperty(property))
            : JSONLDNode().set('@type', getRangesForProperty(property))

  return dispatch(updateChange(fullpath, change))
}

const mapDispatchToProps = (dispatch, {path}) => (
  { onAppend: onAppend(dispatch, path)
  , onDelete: path.last() === '@type' ? null : () => dispatch(deleteIn(path))
  }
)

module.exports = connect(mapStateToProps, mapDispatchToProps)(Property)
