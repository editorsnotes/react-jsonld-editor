"use strict"

const React = require('react') // eslint-disable-line no-unused-vars
    , {List} = require('immutable')

function handleChange(event, props) {
  props.onChange({node: props.node.setIn(props.path, event.target.value)})
}

function handleKeyUp(event, props) {
  if (event.key === 'Enter') {
    props.onChange({editing: List()})
  }
}

module.exports = props => {
  let editing = props.path.equals(props.editing)
    , url = props.node.getIn(props.path)
  return (
    <li key="@id">
      <button
        className="label btn"
        onClick={() => props.onChange({editing: props.path})}
        >
        URL
        {editing || url !== undefined ? null : ' +'}
      </button>
      {editing
       ? <input
           autoFocus
           type="url"
           className={'input'}
           value={url}
           onChange={event => handleChange(event, props)}
           onKeyUp={event => handleKeyUp(event, props)}
         />
       : url === undefined ? null : <a className="ml3" href={url}>{url}</a>
      }
    </li>
  )
}
