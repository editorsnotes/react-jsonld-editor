const React = require('react')
    , {Provider} = require('react-redux')
    , {Map} = require('immutable')
    , {JSONLDNode} = require('immutable-jsonld')
    , configureStore = require('./store/configureStore')
    , {updateUniverse, updateNode} = require('./actions')
    , Node = require('./containers/Node')

const newError = (propName, componentName) => reason => new Error(
  `Invalid prop '${propName}' supplied to ${componentName}: ${reason}`)

const subscribe = (store, node, onSave) => store.subscribe(() => {
  const changedNode = store.getState().node
  if (! changedNode.equals(node)) {
    onSave(changedNode)
  }
})

module.exports = React.createClass(
  { propTypes:
      { universe: (props, propName, componentName) => {
          const error = newError(propName, componentName)
          if (! Map.isMap(props[propName])) {
            return error('must be an Immutable Map')
          }
          for (let domain of ['classes', 'properties', 'datatypeProperties']) {
            if (! props[propName].has(domain)) {
              return error(`must have the key '${domain}'`)
            }
          }
        }
      , onSave: React.PropTypes.func.isRequired
      , node: React.PropTypes.instanceOf(JSONLDNode)
      }

  , getDefaultProps: function() {
      return {node: JSONLDNode()}
    }

  , getInitialState: function() {
      const {universe, node, onSave} = this.props
          , store = configureStore({universe, node})
      return {store, unsubscribe: subscribe(store, node, onSave)}
    }

  , dispatch: function(action) {
      this.state.store.dispatch(action)
    }

  , componentWillReceiveProps: function(next) {
      const current = this.state.store.getState()
      if (! next.universe.equals(current.universe)) {
        this.dispatch(updateUniverse(next.universe))
      }
      if (! next.node.equals(current.node)) {
        this.dispatch(updateNode(next.node))
      }
      if (! next.onSave.equals(current.onSave)) {
        this.state.unsubscribe()
        this.setState({unsubscribe:
          subscribe(this.state.store, this.props.node, next.onSave)})
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
