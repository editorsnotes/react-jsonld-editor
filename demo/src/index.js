const React = require('react') // eslint-disable-line no-unused-vars
    , {render} = require('react-dom')
    , {Map} = require('immutable')
    , {fromExpandedJSONLD} = require('immutable-jsonld')
    , Editor = require('../../lib/Editor')

const NODE = require('../data/test/africa.json')
    , CLASSES = require('../data/indexes/classes.json')
    , PROPERTIES = require('../data/indexes/properties.json')
    , INDIVIDUALS = require('../data/indexes/individuals.json')

const indexByID = nodes => Map(nodes.map(node => [node.id, node]))

const load = json => indexByID(fromExpandedJSONLD(json))

const mount = document.createElement('div')
document.body.appendChild(mount)

const props =
  { node: load(NODE).first()
  , classes: load(CLASSES)
  , properties: load(PROPERTIES)
  , individuals: load(INDIVIDUALS)
  }

render((
  <div className="max-width-4">
    <Editor
      {...props}
      onSave={node => console.log(node.toJS())}
    />
  </div>
), mount)

