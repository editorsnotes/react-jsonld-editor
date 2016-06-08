const React = require('react') // eslint-disable-line no-unused-vars
    , {Provider} = require('react-redux')
    , {render} = require('react-dom')
    , {fromJS} = require('immutable')
    , {fromExpandedJSONLD} = require('immutable-jsonld')
    , configureStore = require('./store/configureStore')
    , Node = require('./containers/Node')

const mount = document.createElement('div')
document.body.appendChild(mount)

const node = fromExpandedJSONLD(require('../data/test/africa.json')).first()

const universe = fromJS(
  { 'individuals': require('../data/indexes/individuals.json')
  , 'classes': require('../data/indexes/classes.json')
  , 'properties': require('../data/indexes/properties.json')
  , 'datatype-properties': require('../data/indexes/datatype-properties.json')
  }
)

render((
  <div className="max-width-4">
    <Provider store={configureStore({node, universe})}>
      <Node/>
    </Provider>
  </div>
), mount)

