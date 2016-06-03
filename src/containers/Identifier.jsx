const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {List} = require('immutable')
    , ShowIdentifier = require('./ShowIdentifier')
    , EditIdentifier = require('./EditIdentifier')
    , {INDIVIDUALS} = require('../universe')

const Identifier = ({path, domain, editable, deletable}) => editable
  ? <EditIdentifier path={path} domain={domain} />
  : <ShowIdentifier path={path} domain={domain} deletable={deletable} />

Identifier.propTypes = {
  path: React.PropTypes.instanceOf(List).isRequired,
  domain: React.PropTypes.string,
  editable: React.PropTypes.bool
}

const mapStateToProps = (state, {path, domain = INDIVIDUALS}) => {
  return (
    { path
    , domain
    , editable: path.equals(state.editPath)
    }
  )
}

module.exports = connect(mapStateToProps)(Identifier)
