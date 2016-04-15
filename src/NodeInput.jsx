"use strict"

var React = require('react')
  , {Map, List} = require('immutable')
  , {JSONLDNode} = require('immutable-jsonld')
  , PropertyInput = require('./PropertyInput')

module.exports = React.createClass({
  displayName: 'NodeInput',

  propTypes: {
    node: React.PropTypes.instanceOf(JSONLDNode).isRequired,
    path: React.PropTypes.instanceOf(List),
    editing: React.PropTypes.instanceOf(List),
    onChange: React.PropTypes.func.isRequired,
    labels: React.PropTypes.instanceOf(Map),
    ranges: React.PropTypes.instanceOf(Map),
    types: React.PropTypes.instanceOf(Map),
    shapes: React.PropTypes.instanceOf(Map)
  },

  getDefaultProps: function() {
    return {
      path: List(),
      editing: List(),
      labels: Map(),
      ranges: Map(),
      types: Map(),
      shapes: Map()
    }
  },

  // add missing properties
  _addMissingProperties(node) {
    node.types
      .filter(type => this.props.shapes.has(type))
      .forEach(type => {
        let shape = this.props.shapes.get(type)
          , total = shape.valueSeq().reduce((sum, v) => sum + v, 0)
        node = node.merge(
          shape.entrySeq()
            .filter(([ , count]) => count > total / 50)
            .sort(([ , countA], [ , countB]) =>
              countA < countB
                ? 1
                : (countA > countB ? -1 : 0))
            .map(([predicate, ]) => predicate)
            .map(predicate => [predicate, List()])
        )
      })
    return node
  },

  _renderID: function(id) {
    return id === undefined ? null : <span>@id: {id}</span>
  },

  render: function() {
    let node = this._addMissingProperties(
                 this.props.node.getIn(this.props.path))
      , nodeProperties = node.propertySeq()
          .map(([name, ]) => (
            <PropertyInput
              key={name}
              {...this.props}
              path={this.props.path.push(name)}
            />
          ))
    return (
      <div className="node-input border border-gray p1">
        <ul className="list-reset ml4">
          <li>{this._renderID(node.id)}</li>
          <PropertyInput
            {...this.props}
            path={this.props.path.push('@type')}
          />
          {nodeProperties}
        </ul>
      </div>
    )
  }
})
