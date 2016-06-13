const React = require('react') // eslint-disable-line no-unused-vars
    , {List, Iterable} = require('immutable')
    , {JSONLDNode, JSONLDValue} = require('immutable-jsonld')
    , Value = require('../containers/Value')
    , TypeIdentifier = require('../containers/TypeIdentifier')
    , DeleteButton = require('./DeleteButton')

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
  , onAppend = null
  , onDelete = null
  }) => {
  if (Node === null) {
    // circular dependency
    Node = require('../containers/Node')
  }
  return (
    <li className="mb1 relative">
      <DeleteButton
        onClick={onDelete}
        classes={onDelete ? '' : 'hidden'}
        color="#ff4136"
      />
      <span
        className={
          `inline-block align-middle bold cursor-pointer lowercase black
           ${onAppend ? '' : 'muted'}`
        }
        onClick={onAppend ? () => onAppend(objects.count()) : null}
      >
        {`${label} ${onAppend ? '+' : ''}`}
      </span>
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
  , onAppend: React.PropTypes.func
  , onDelete: React.PropTypes.func
  }

module.exports = Property
