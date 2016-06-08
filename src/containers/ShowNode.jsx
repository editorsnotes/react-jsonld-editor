const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {List} = require('immutable')
    , {JSONLDNode} = require('immutable-jsonld')
    , ShowIdentifier = require('./ShowIdentifier')
    , Property = require('./Property')
    , DeleteButton = require('../components/DeleteButton')
    , AddButton = require('../components/AddButton')
    , {updateChange, deleteIn} = require('../actions')
    , {getEditedNode} = require('../selectors')

const Node = ({node, path, dispatch}) => (
  <div className={
    `border border-silver py1 pl1 ${node.id ? 'pr1' : 'pr3'} relative`}
  >
    {node.id
      ? ( // node is named
          <ShowIdentifier
            path={path.push('@id')}
            deletable={! path.isEmpty()}
          />
        )
      : ( // node is blank / anonymous
          <DeleteButton
            classes="absolute top-0 right-0"
            onClick={() => { dispatch(deleteIn(path)) }}
          />
        )
    }
    <ul className="list-reset">
      <Property label="is a" path={path.push('@type')} />
      {node.propertySeq().map(([predicate, ]) => (
        <Property
          key={predicate}
          path={path.push(predicate)}
        />))
      }
    </ul>
    <AddButton
      onClick={() => dispatch(updateChange(path.push(''), List()))}
    />
  </div>
)

Node.propTypes = {
  node: React.PropTypes.instanceOf(JSONLDNode).isRequired,
  path: React.PropTypes.instanceOf(List).isRequired
}

const mapStateToProps = (state, {path}) => (
  { node: getEditedNode(state).getIn(path)
  , path
  }
)

module.exports = connect(mapStateToProps)(Node)

