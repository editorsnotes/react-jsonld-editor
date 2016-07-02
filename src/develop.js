const React = require('react') // eslint-disable-line no-unused-vars
    , {render} = require('react-dom')
    , Editor = require('./Editor')
    , uuid = require('node-uuid')

const mount = document.createElement('div')
document.body.appendChild(mount)

const mintID = () => {
  const {protocol, hostname} = window.location
  return `${protocol}//${hostname}/.well-known/genid/${uuid.v4()}`
}

render((
  <div>
    <Editor
      mintID={mintID}
      onSave={node => console.log(node.toJS())}
    />
  </div>
), mount)

