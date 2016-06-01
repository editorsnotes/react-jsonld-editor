const React = require('react') // eslint-disable-line no-unused-vars
    , {Provider} = require('react-redux')
    , {render} = require('react-dom')
    , {fromExpandedJSONLD} = require('immutable-jsonld')
    , {getAllLabelsForNode} = require('./universe')
    , configureStore = require('./store/configureStore')
    , Node = require('./containers/Node')

const mount = document.createElement('div')
document.body.appendChild(mount)

const node = fromExpandedJSONLD(require('../data/africa.json')).first()
const store = configureStore({node, labels: getAllLabelsForNode(node)})

render((
  <div className="max-width-4">
    <Provider store={store}>
      <Node/>
    </Provider>
    <pre>{JSON.stringify(store.getState().node.toJS(), null, '  ')}</pre>
  </div>
), mount)

