const React = require('react')
    , {Provider} = require('react-redux')
    , {Map} = require('immutable')
    , {JSONLDNode, fromExpandedJSONLD} = require('immutable-jsonld')
    , configureStore = require('./store/configureStore')
    , {updateUniverse, updateNode} = require('./actions')
    , EditNode = require('./containers/EditNode')

let lastNodeState = null

const indexByID = nodes => Map(nodes.map(node => [node.id, node]))

const load = json => indexByID(fromExpandedJSONLD(json))

const Editor = React.createClass(
  { propTypes:
      { classes: React.PropTypes.instanceOf(Map)
      , properties: React.PropTypes.instanceOf(Map)
      , individuals: React.PropTypes.instanceOf(Map)
      , datatypes: React.PropTypes.instanceOf(Map)
      , languages: React.PropTypes.instanceOf(Map)
      , node: React.PropTypes.instanceOf(JSONLDNode)
      , onSave: React.PropTypes.func
      , mintID: React.PropTypes.func
      }

  , getDefaultProps: function() {
      return (
        { classes: Map()
        , properties: Map()
        , individuals: Map()
        , datatypes: load(require('./datatypes.json'))
        , languages: load(require('./languages.json'))
        , node: JSONLDNode()
        , onSave: () => {}
        , mintID: null
        }
      )
    }

  , subscribeToNodeUpdates: function(store, onSave) {
      return store.subscribe(() => {
        const node = store.getState().node
        if (! node.equals(lastNodeState)) {
          onSave(node)
          lastNodeState = node
        }
      })
    }

  , dispatch: function(action) {
      this.state.store.dispatch(action)
    }

  , getInitialState: function() {
      const {node, onSave, ...props} = this.props
      const store = configureStore({node, ...props})
      lastNodeState = node
      return {store, unsubscribe: this.subscribeToNodeUpdates(store, onSave)}
    }

  , componentWillReceiveProps: function(next) {
      const current = this.state.store.getState()
      for (let domain of
        [ 'classes'
        , 'properties'
        , 'individuals'
        , 'datatypes'
        , 'languages'
        ]) {
          if (! next[domain].equals(current[domain])) {
            this.dispatch(updateUniverse({[domain]: next[domain]}))
          }
      }
      if (! next.node.equals(current.node)) {
        this.dispatch(updateNode(next.node))
      }
      if (next.onSave !== current.onSave) {
        this.state.unsubscribe()
        this.setState({unsubscribe:
          this.subscribeToNodeUpdates(this.state.store, next.onSave)
        })
      }
    }

  , render: function() {
      return (
        <Provider store={this.state.store}>
          <EditNode/>
        </Provider>
      )
    }
  }
)

module.exports = Editor
