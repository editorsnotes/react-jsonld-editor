"use strict"

var React = require('react')
  , {fromJS, List} = require('immutable')
  , {JSONLDNode} = require('immutable-jsonld')
  , NodeInput = require('./NodeInput')
  , labels = fromJS(require('../data/labels.json'))
  , ranges = fromJS(require('../data/ranges.json'))
  , types = fromJS(require('../data/types.json'))
  , shapes = fromJS(require('../data/shapes.json'))

module.exports = React.createClass({
  displayName: 'Index',

  getInitialState: function() {
    return {
      node: JSONLDNode(),
      editing: List()}
  },

  _handleChange: function(changed) {
    this.setState(changed)
  },

  render: function () {
    return (
      <div>
        <NodeInput
           node={this.state.node}
           labels={labels}
           ranges={ranges}
           types={types}
           shapes={shapes}
           editing={this.state.editing}
           onChange={this._handleChange}
        />
        <pre>{JSON.stringify(this.state.node.toJS(), null, '  ')}</pre>
      </div>
    )
  }
})
