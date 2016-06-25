const React = require('react')
    , {Provider} = require('react-redux')
    , {Map, List} = require('immutable')
    , {JSONLDNode} = require('immutable-jsonld')
    , configureStore = require('./store/configureStore')
    , { updateClasses
      , updateProperties
      , updateIndividuals
      , updateNode
      , NO_CHANGE
      } = require('./actions')
    , Node = require('./containers/Node')

const Editor = React.createClass(
  { propTypes:
      { classes: React.PropTypes.instanceOf(Map)
      , properties: React.PropTypes.instanceOf(Map)
      , individuals: React.PropTypes.instanceOf(Map)
      , node: React.PropTypes.instanceOf(JSONLDNode)
      , onSave: React.PropTypes.func
      }

  , getDefaultProps: function() {
      return (
        { classes: Map()
        , properties: Map()
        , individuals: Map()
        , node: JSONLDNode()
        , onSave: () => {}
        }
      )
    }

  , subscribeToNodeUpdates: function(store, onSave) {
      return store.subscribe(() => {
        const node = store.getState().node
        if (! node.equals(this.props.node)) {
          onSave(node)
        }
      })
    }

  , dispatch: function(action) {
      this.state.store.dispatch(action)
    }

  , getInitialState: function() {
      const {classes, properties, individuals, node, onSave} = this.props
      const store = configureStore(
        { editpath: List()
        , change: NO_CHANGE
        , input: ''
        , selectedSuggestion: {}
        , editingProperties: false
        , classes
        , properties
        , individuals
        , node}
      )
      return {store, unsubscribe: this.subscribeToNodeUpdates(store, onSave)}
    }

  , componentWillReceiveProps: function(next) {
      const current = this.state.store.getState()
      if (! next.classes.equals(current.classes)) {
        this.dispatch(updateClasses(next.classes))
      }
      if (! next.properties.equals(current.properties)) {
        this.dispatch(updateProperties(next.properties))
      }
      if (! next.individuals.equals(current.individuals)) {
        this.dispatch(updateIndividuals(next.individuals))
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
          <Node/>
        </Provider>
      )
    }
  }
)

Editor.components = { AddSuggestion: require('./components/AddSuggestion') }

module.exports = Editor
