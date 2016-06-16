const React = require('react') // eslint-disable-line no-unused-vars
    , {render} = require('react-dom')
    , {fromJS} = require('immutable')
    , {fromExpandedJSONLD} = require('immutable-jsonld')
    , Editor = require('../../lib/Editor')

const mount = document.createElement('div')
document.body.appendChild(mount)

const node = fromExpandedJSONLD(require('../data/test/africa.json')).first()

const universe = fromJS(
  { individuals: require('../data/indexes/individuals.json')
  , classes: require('../data/indexes/classes.json')
  , properties: require('../data/indexes/properties.json')
  , datatypeProperties: require('../data/indexes/datatype-properties.json')
  }
)

render((
  <div className="max-width-4">
    <Editor
      node={node}
      universe={universe}
      onSave={node => console.log(node.toJS())}
    />
  </div>
), mount)

