const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {deleteIn, updateChange} = require('../actions')
    , Value = require('../components/Value')
    , {getEditedNode} = require('../selectors')

const mapStateToProps = (state, {path}) => (
  {value: getEditedNode(state).getIn(path)}
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {deleteIn, updateChange}, dispatch)

const mergeProps = ({value}, {deleteIn, updateChange}, {path}) => (
  { value
  , onClick: () => updateChange(path, value, value.value)
  , onClickDelete: () => deleteIn(path)
  }
)

module.exports = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Value)
