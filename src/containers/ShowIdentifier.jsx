const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , Chip = require('../components/Chip')
    , {deleteIn} = require('../actions')
    , { getNode
      , getLabelResolver
      } = require('../selectors')

const mapStateToProps = (state, {path}) => (
  { label: getLabelResolver(state)(getNode(state).getIn(path)) }
)

const mapDispatchToProps = dispatch => bindActionCreators({deleteIn}, dispatch)

const mergeProps = ({label}, {deleteIn}, {path, ...props}) => (
  { children: label
  , onClickDelete: () => deleteIn(path)
  , ...props
  }
)

const ShowIdentifier = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(Chip)

ShowIdentifier.displayName = 'ShowIdentifier'

module.exports = ShowIdentifier
