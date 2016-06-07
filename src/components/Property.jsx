const React = require('react') // eslint-disable-line no-unused-vars
    , {List, Iterable} = require('immutable')
    , {JSONLDNode, JSONLDValue} = require('immutable-jsonld')
    , Value = require('../containers/Value')
    , TypeIdentifier = require('../containers/TypeIdentifier')

let Node = null // circular dependency

const renderObject = path => (o, i) => (
  <li
    key={`object-${i}`}
    className="inline-block mr1 mb1"
  >
    {JSONLDValue.isJSONLDValue(o)
      ? <Value path={path.push(i)} />
      : JSONLDNode.isJSONLDNode(o)
        ? <Node path={path.push(i)} />
        : <TypeIdentifier path={path.push(i)} />}
  </li>
)

const Property = (
  { objects
  , path
  , label = path.last()
  , onAppend
  }) => {
  if (Node === null) {
    // circular dependency
    Node = require('../containers/Node')
  }
  return (
    <li className="mb1">
      <button
        className="label btn"
        onClick={() => onAppend(objects.count())}
      >
        {label} +
      </button>
      <ul className="list-reset ml3">
        {objects.map(renderObject(path))}
      </ul>
    </li>
  )
}

Property.propTypes =
  { objects: (props, propName, componentName)  => {
      if (! Iterable.isIndexed(props[propName])) {
        return new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`: must be an Indexed Iterable.'
        )
      }
    }
  , path: React.PropTypes.instanceOf(List).isRequired
  , label: React.PropTypes.string
  , onAppend: React.PropTypes.func.isRequired
  }

module.exports = Property
