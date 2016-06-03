const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {startEditValue, deleteIn} = require('../actions')
    , Value = require('../components/Value')

const mapStateToProps = (state, {path}) => (
  {value: state.node.getIn(path), path}
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {startEditValue, deleteIn}, dispatch)

const mergeProps = ({value, path}, {startEditValue, deleteIn}) => (
  { value
  , path
  , onClick: () => startEditValue(path, value.value)
  , onClickDelete: () => deleteIn(path)
  }
)

module.exports = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Value)
