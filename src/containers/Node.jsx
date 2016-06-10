const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {List} = require('immutable')
    , {getEditPath, isEditingProperties} = require('../selectors')
    , EditIdentifier = require('./EditIdentifier')
    , ShowNode = require('./ShowNode')
    , EditNodeProperties = require('./EditNodeProperties')

const Node = ({path, editpath, isEditingProperties}) => (
  (! path.equals(editpath))
    ? <ShowNode path={path} />
    : isEditingProperties
        ? <EditNodeProperties path={path} />
        : path.isEmpty()
            ? <ShowNode path={path} />
            : <EditIdentifier path={path.push('@id')} />
)

Node.propTypes = {
  path: React.PropTypes.instanceOf(List).isRequired,
  edipath: React.PropTypes.instanceOf(List).isRequired,
  isEditingProperties: React.PropTypes.bool.isRequired
}

const mapStateToProps = (state, {path = List()}) => (
  { path
  , editpath: getEditPath(state)
  , isEditingProperties: isEditingProperties(state)
  }
)

module.exports = connect(mapStateToProps)(Node)

