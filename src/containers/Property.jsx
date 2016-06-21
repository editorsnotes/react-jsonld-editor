const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {List} = require('immutable')
    , { getEditedNode
      , getEmptyObjectCreator
      , getLabelResolver
      , isEditingProperties
      , getEditPath
      , getChange
      } = require('../selectors')
    , {updateChange, deleteProperty} = require('../actions')
    , Property = require('../components/Property')

const mapStateToProps = (state, {path, label, appendable = true}) => {
  return { objects:
      getEditedNode(state).getIn(path, List())
  , objectCreator:
      getEmptyObjectCreator(state)
  , label:
      label || getLabelResolver(state)(path.last()).value
  , appendable: appendable && (! (isEditingProperties(state)))
  , deletable:
      ( isEditingProperties(state)
        && path.last() !== '@type'
        && path.butLast().equals(getEditPath(state))
      )
  , change:
      getChange(state)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateChange, deleteProperty}, dispatch)

const mergeProps = (
  {objects, objectCreator, label, deletable, appendable, change},
  {updateChange, deleteProperty},
  {path}) => (

  { objects
  , path
  , label

  , onAppend: appendable
      ? numObjects => updateChange(
          path.push(numObjects), objectCreator(path.last()))
      : null

  , onDelete: deletable
      ? () => deleteProperty(path, change)
      : null
  }
)

module.exports = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(Property)
