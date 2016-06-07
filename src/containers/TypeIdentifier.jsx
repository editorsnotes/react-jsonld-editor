const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {List} = require('immutable')
    , {getEditPath} = require('../selectors')
    , ShowIdentifier = require('./ShowIdentifier')
    , EditTypeIdentifier = require('./EditTypeIdentifier')

const TypeIdentifier = ({path, editable, deletable}) => editable
  ? <EditTypeIdentifier path={path} />
  : <ShowIdentifier path={path} deletable={deletable} />

TypeIdentifier.propTypes = {
  path: React.PropTypes.instanceOf(List).isRequired,
  editable: React.PropTypes.bool,
  deletable: React.PropTypes.bool
}

const mapStateToProps = (state, {path, deletable = true}) => (
  { path
  , editable: path.equals(getEditPath(state))
  , deletable
  }
)

module.exports = connect(mapStateToProps)(TypeIdentifier)
