const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {List} = require('immutable')
    , Property = require('../components/Property')
    , {appendTo} = require('../actions')

const mapStateToProps = (state, {path, label}) => (
  { objects: state.node.getIn(path, List())
  , path
  , label: label || state.labels.get(path.last())
  }
)

const mapDispatchToProps = dispatch => bindActionCreators({appendTo}, dispatch)

module.exports = connect(mapStateToProps, mapDispatchToProps)(Property)
