const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {List} = require('immutable')
    , {JSONLDNode} = require('immutable-jsonld')
    , Identifier = require('./Identifier')
    , Property = require('./Property')
    , AddButton = require('../components/AddButton')
    , DeleteButton = require('../components/DeleteButton')
    , {appendEmptyProperty, deleteIn} = require('../actions')

const Node = ({node, path = List(), dispatch}) => {
  return (
    <div className="border border-silver p1 relative">
      {node.id
        ? ( // node is named
            <Identifier
              path={path.push('@id')}
              deletable={! path.isEmpty()}
            />
          )
        : ( // node is blank / anonymous
            <DeleteButton
              color="#000"
              style={{position: 'absolute', right: '8px'}}
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
          />
        ))}
      </ul>
      <AddButton
        onClick={() => { dispatch(appendEmptyProperty(path.push(''))) }}
      />
    </div>
  )
}

Node.propTypes = {
  node: React.PropTypes.instanceOf(JSONLDNode).isRequired,
  path: React.PropTypes.instanceOf(List)
}

const mapStateToProps = (state, {path = List()}) => (
  {node: state.node.getIn(path) , path}
)

module.exports = connect(mapStateToProps)(Node)

