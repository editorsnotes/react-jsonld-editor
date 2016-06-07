const { createStore } = require('redux')
    , reducer = require('../reducers')
    , {getAllLabelsForNode} = require('../universe')

module.exports = node => createStore(
  reducer,
  {node, labels: getAllLabelsForNode(node)},
  window.devToolsExtension ? window.devToolsExtension() : undefined
)

