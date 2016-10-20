const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {updateRootNodePath, deleteIn} = require('../actions')
    , Chip = require('../components/Chip')
    , {getNode} = require('../selectors')
    , {labelOrID} = require('../utils')

const mapStateToProps = (state, {path}) => (
  { children: [labelOrID(getNode(state).getIn(path))]
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateRootNodePath, deleteIn}, dispatch)

const mergeProps = (
  {children},
  {updateRootNodePath, deleteIn},
  {path, deletable = true, ...props}) => (

  { children
  , color: 'white'
  , backgroundColor: 'black'
  , onClick: () => updateRootNodePath(path)
  , onClickDelete: deletable ? () => deleteIn(path) : null
  , ...props
  }
)

const ShowNode = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Chip)

ShowNode.displayName = 'ShowNode'

module.exports = ShowNode
