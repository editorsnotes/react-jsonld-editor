const React = require('react')
    , {Provider} = require('react-redux')
    , {Map} = require('immutable')
    , {JSONLDNode, fromExpandedJSONLD} = require('immutable-jsonld')
    , configureStore = require('./store/configureStore')
    , { updateUniverse
      , updateNode
      , updateOnNewNamedNode
      , updateMintID
      } = require('./actions')
    , EditNode = require('./containers/EditNode')
    , {getNode} = require('./selectors')

const indexByID = nodes => Map(nodes.map(node => [node.id, node]))

const load = json => indexByID(fromExpandedJSONLD(json))

const observeStore = (store, select, onChange) => {
  let currentState

  const handleChange = () => {
    const nextState = select(store.getState())
    if (! nextState.equals(currentState)) {
      currentState = nextState
      onChange(currentState)
    }
  }

  let unsubscribe = store.subscribe(handleChange)
  handleChange()
  return unsubscribe
}

const Editor = React.createClass(
  { propTypes:
      { classes: React.PropTypes.instanceOf(Map)
      , properties: React.PropTypes.instanceOf(Map)
      , individuals: React.PropTypes.instanceOf(Map)
      , datatypes: React.PropTypes.instanceOf(Map)
      , languages: React.PropTypes.instanceOf(Map)
      , node: React.PropTypes.instanceOf(JSONLDNode)
      , mintID: React.PropTypes.func
      , onSave: React.PropTypes.func
      , onNewNamedNode: React.PropTypes.func
      }

  , getDefaultProps: function() {
      return (
        { classes: Map()
        , properties: Map()
        , individuals: Map()
        , datatypes: load(require('./datatypes.json'))
        , languages: load(require('./languages.json'))
        , node: JSONLDNode()
        , mintID: undefined
        , onSave: () => {}
        , onNewNamedNode: () => {}
        }
      )
    }

  , childContextTypes: { rebass: React.PropTypes.object }

  , getChildContext: function() {
      return {rebass: {PanelHeader: {fontWeight: 'inherit'}}}
    }

  , dispatch: function(action) {
      this.state.store.dispatch(action)
    }

  , getInitialState: function() {
      const {onSave, ...props} = this.props
      const store = configureStore({...props})
      return (
        { store
        , unsubscribe: observeStore(store, getNode, onSave)
        }
      )
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
      if (next.mintID !== current.mintID) {
        this.dispatch(updateMintID(next.mintID))
      }
      if (next.onNewNamedNode !== current.onNewNamedNode) {
        this.dispatch(updateOnNewNamedNode(next.onNewNamedNode))
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
