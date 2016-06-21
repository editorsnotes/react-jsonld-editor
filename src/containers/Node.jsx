const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {List} = require('immutable')
    , {getEditPath, isEditingProperties} = require('../selectors')
    , ShowNode = require('./ShowNode')
    , AddNode = require('./AddNode')
    , EditNodeProperties = require('./EditNodeProperties')

const Node = ({path, editpath, isEditingProperties}) => path.equals(editpath)
  // editing
  ? isEditingProperties
      // property editing mode
      ? <EditNodeProperties path={path} />
      // value editing mode
      : path.isEmpty()
          // can't edit identifier of root node
          ? <ShowNode path={path} />
          // show component for selecting an @id
          : <AddNode path={path.push('@id')} />
  // showing
  : <ShowNode path={path} />

Node.propTypes = {
  path: React.PropTypes.instanceOf(List).isRequired,
  editpath: React.PropTypes.instanceOf(List).isRequired,
  isEditingProperties: React.PropTypes.bool.isRequired
}

const mapStateToProps = (state, {path = List()}) => (
  { path
  , editpath: getEditPath(state)
  , isEditingProperties: isEditingProperties(state)
  }
)

module.exports = connect(mapStateToProps)(Node)

