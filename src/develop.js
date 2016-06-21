const React = require('react') // eslint-disable-line no-unused-vars
    , {render} = require('react-dom')
    , Editor = require('./Editor')

const mount = document.createElement('div')
document.body.appendChild(mount)

render((
  <div>
    <Editor onSave={node => console.log(node.toJS())} />
  </div>
), mount)

