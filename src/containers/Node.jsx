const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {List} = require('immutable')
    , {JSONLDNode} = require('immutable-jsonld')
    , Identifier = require('./Identifier')
    , Property = require('./Property')

// don't show id on root node?

// if node is empty and it is not the root node, display a resource
// chooser over individuals.

// if they type a value that matches no existing labels, create a
// blank node with that label.

// if a node has an id and it is not the root node, show a uri ref
// with a button to expand

// icon on blank nodes to promote them to topics

const Node = ({node, path = List()}) => {
  return (
    <div className="border border-silver p1">
      {node.id ? <Identifier path={path.push('@id')} /> : null}
      <ul className="list-reset">
        <Property label="is a" path={path.push('@type')} />
        {node.propertySeq().map(([predicate, ]) => (
          <Property
            key={predicate}
            path={path.push(predicate)}
          />
        ))}
      </ul>
    </div>
  )
}

Node.propTypes = {
  node: React.PropTypes.instanceOf(JSONLDNode).isRequired,
  path: React.PropTypes.instanceOf(List)
}
/*
const sortByCount = ([ , countA], [ , countB]) => (
  countA < countB ? 1 : (countA > countB ? -1 : 0)
)

const findCommonPredicates = shape => {
  let total = shape.valueSeq().reduce((sum, v) => sum + v, 0)
  return shape.entrySeq()
    .filter(([ , count]) => count > total / 50)
    .sort(sortByCount)
    .map(([predicate, ]) => predicate)
}

const addMissingProperties = (node, shapes) => {
  let predicates = node.types
    .filter(type => shapes.has(type))
    .map(type => findCommonPredicates(shapes.get(type)))
    .reduce((set, predicates) => set.union(predicates), Set())
  return node.merge(predicates.map(predicate => [predicate, List()]))
}
*/
const mapStateToProps = (state, {path = List()}) => {
  return {node: state.node.getIn(path) , path}
}

module.exports = connect(mapStateToProps)(Node)

