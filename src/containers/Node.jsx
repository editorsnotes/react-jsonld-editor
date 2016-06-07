const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {List} = require('immutable')
    , {getEditPath} = require('../selectors')
    , EditIdentifier = require('./EditIdentifier')
    , ShowNode = require('./ShowNode')

const Node = ({path, editable}) => editable
  ? <EditIdentifier path={path.push('@id')} />
  : <ShowNode path={path} />

Node.propTypes = {
  path: React.PropTypes.instanceOf(List).isRequired,
  editable: React.PropTypes.bool,
}

const mapStateToProps = (state, {path = List()}) => (
  { path
  , editable: path.isEmpty() ? false : path.equals(getEditPath(state))
  }
)

module.exports = connect(mapStateToProps)(Node)

