const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {List} = require('immutable')
    , Property = require('../components/Property')
    , {deleteIn, updateChange} = require('../actions')
    , { getEditedNode
      , getLabelResolver
      , getEmptyObjectCreator
      } = require('../selectors')

const mapStateToProps = (state, {path, label}) => (
  { objects: getEditedNode(state).getIn(path, List())
  , objectCreator: getEmptyObjectCreator(state)
  , label: label || getLabelResolver(state)(path.last())
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {deleteIn, updateChange}, dispatch)

const mergeProps = (
  {objects, objectCreator, label},
  {deleteIn, updateChange},
  {path}) => (

  { objects
  , path
  , label

  , onAppend: numObjects => updateChange(
      path.push(numObjects), objectCreator(path.last()))

  , onDelete: path.last() === '@type' ? null : () => deleteIn(path)
  }

)

module.exports = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(Property)
