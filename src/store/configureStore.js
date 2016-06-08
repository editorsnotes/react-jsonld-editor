const {createStore} = require('redux')
//    , {List} = require('immutable')
    , reducer = require('../reducers')
    , {getAllLabelsForNode} = require('../universe')

module.exports = node => createStore(
  reducer,
  { node
  , labels: getAllLabelsForNode(node)
//  , edit: {path: List.of("http://www.w3.org/ns/prov#wasDerivedFrom", 0, "http://www.w3.org/2000/01/rdf-schema#label", 0)}
  },
  window.devToolsExtension ? window.devToolsExtension() : undefined
)

