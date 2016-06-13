const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {deleteIn, updateChange} = require('../actions')
    , Value = require('../components/Value')
    , {getEditedNode, isEditingProperties} = require('../selectors')

const mapStateToProps = (state, {path}) => (
  { value: getEditedNode(state).getIn(path)
  , editable: (! isEditingProperties(state))
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {deleteIn, updateChange}, dispatch)

const mergeProps = ({value, editable}, {deleteIn, updateChange}, {path}) => (
  { value
  , onClick:
      editable ? () => updateChange(path, value, false, value.value) : null
  , onClickDelete:
      editable ? () => deleteIn(path) : null
  }
)

module.exports = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Value)
