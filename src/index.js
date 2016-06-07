const React = require('react') // eslint-disable-line no-unused-vars
    , {Provider} = require('react-redux')
    , {render} = require('react-dom')
    , {fromExpandedJSONLD} = require('immutable-jsonld')
    , configureStore = require('./store/configureStore')
    , Node = require('./containers/Node')

const mount = document.createElement('div')
document.body.appendChild(mount)

const node = fromExpandedJSONLD(require('../data/test/africa.json')).first()

render((
  <div className="max-width-4">
    <Provider store={configureStore(node)}>
      <Node/>
    </Provider>
  </div>
), mount)

