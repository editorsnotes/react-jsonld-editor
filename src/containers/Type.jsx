const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {List} = require('immutable')
    , { getEditPath
      , getEditedNode
      , isEditingProperties
      } = require('../selectors')
    , {updateChange, acceptChange} = require('../actions')
    , Type = require('../components/Type')

const mapStateToProps = (state, {path, appendable}) => (
  { ids: getEditedNode(state).getIn(path, List())
  , appendable: appendable && (! (isEditingProperties(state)))
  , appending: path.equals(getEditPath(state))
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateChange, acceptChange}, dispatch)

const mergeProps = (
  {ids, appendable, appending},
  {updateChange, acceptChange},
  {path}) => (

  { ids
  , path
  , onAppend: appendable ? () => updateChange(path, ids) : null
  , onAccept: appending ? id => acceptChange(path, ids.push(id)) : null
  }
)

module.exports = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(Type)
