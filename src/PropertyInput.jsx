"use strict"

const React = require('react') // eslint-disable-line no-unused-vars
    , {List} = require('immutable')
    , {JSONLDNode, JSONLDValue} = require('immutable-jsonld')
    , NodeDisplay = require('./NodeDisplay')
    , ValueDisplay = require('./ValueDisplay')
    , ValueInput = require('./ValueInput')
    , ResourceChooser = require('./ResourceChooser')
    , {OWL} = require('./namespaces')
    , {labelFor} = require('./utils')

var NodeInput = null // circular dependency between components

const renderValue = (props, value, path) => {
  return (
    <li
      key={path.join('-')}
      className="inline-block mr1 mb1"
    >
      {path.equals(props.editing)
        ? <ValueInput
            {...props}
            path={path}
            value={value}
          />
        : <ValueDisplay
            {...props}
            path={path}
            value={value}
          />
      }
    </li>
  )
}

const renderNode = (props, path) => (
  <li key={path.join('-')}>
    <NodeInput {...props} path={path} />
  </li>
)

// TODO
const renderType = (props, type, path) => {
  let types = props.node.getIn(props.path, List())
  return (
    <li
      key={path.join('-')}
      className="inline-block mr1 mb1"
    >
      {path.equals(props.editing)
        ? <ResourceChooser
          resources={props.shapes.keySeq()
            .filterNot(type => types.includes(type)).toJS()}
          resourceLabels={props.labels}
          shapes={props.shapes}
          onSelect={type => props.onChange(
            {node: props.node.setIn(path, type), editing: List()}
          )}
         />
        : <NodeDisplay
            {...props}
            id={type}
          />
      }
    </li>
  )
}

const renderItem = (props, item, path) =>
  JSONLDValue.isJSONLDValue(item)
    ? renderValue(props, item, path)
    : JSONLDNode.isJSONLDNode(item)
      ? renderNode(props, path)
      : renderType(props, item, path)

const createEmptyValue = (predicate, ranges) =>
  ranges.has(predicate)
    ? JSONLDValue({'@value': '',
                   '@type': ranges.get(predicate).first()})
    : JSONLDValue()

const createEmptyNode = (predicate, ranges) =>
  ranges.has(predicate)
    ? JSONLDNode({'@type': ranges.get(predicate)})
    : JSONLDNode()

// types includes OWL.ObjectProperty OR
// types includes RDF.Property and range is not RDFS.Literal

function addEmptyValue(props) {
  let predicate = props.path.last()
    , empty = null
  if (predicate !== '@type') {
    let types = props.types.get(predicate)
    empty = types && types.includes(OWL.ObjectProperty)
      ? createEmptyNode(predicate, props.ranges)
      : createEmptyValue(predicate, props.ranges)
  }
  let values = props.node.getIn(props.path, List())
  props.onChange(
    { node: props.node.setIn(props.path, values.push(empty))
    , editing: props.path.push(values.size)
    }
  )
}

module.exports = props => {
  if (NodeInput === null) {
    // circular dependency between components
    NodeInput = require('./NodeInput')
  }
  let name = props.path.last()
    , label = labelFor(props.labels, name)
    , valueItems = props.node
        .getIn(props.path, List())
        .map((v, i) => renderItem(props, v, props.path.push(i)))
  return (
    <li key={name}>
      <button
        className="label btn"
        onClick={() => {addEmptyValue(props)}}
        >
        {label} +
      </button>
      <ul className="list-reset ml3">
        {valueItems}
      </ul>
    </li>
  )
}
