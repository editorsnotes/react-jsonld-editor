const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , Identifier = require('../components/Identifier')
    , {startEditIdentifier} = require('../actions')

const mapStateToProps = (state, {path, domain}) => {
  let id = state.node.getIn(path)
  return (
    { id
    , path
    , domain
    , label: state.labels.get(id)
    }
  )
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {startEdit: startEditIdentifier}, dispatch)

module.exports = connect(mapStateToProps, mapDispatchToProps)(Identifier)
