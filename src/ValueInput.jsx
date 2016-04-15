"use strict"

var React = require('react') // eslint-disable-line no-unused-vars
  , {List} = require('immutable')
  , langTags = require('language-tags')
  , validator = require('validator')
  , {XSD, RDFS} = require('./namespaces')

const VALIDATORS = {
  [RDFS.Literal]: () => true,
  [XSD.anyAtomicType]: () => true,
  [XSD.dateTime]: s => validator.isDate(s),
  [XSD.float]: s => validator.isFloat(s),
  [XSD.gYear]: s => validator.isDate(s),
  [XSD.integer]: s => validator.isInt(s),
  [XSD.string]: () => true
}

function handleChange(event, props) {
  let newValue = props.node.getIn(props.path).set('@value', event.target.value)
  props.onChange({node: props.node.setIn(props.path, newValue)})
}

function handleKeyUp(event, props) {
  if (event.key === 'Enter') {
    props.onChange({editing: List()})
  }
}

const isValid = value =>
  VALIDATORS[value.type || XSD.anyAtomicType](value.value + '')

const renderLanguage = value => {
  if (! value.language) return null
  let tag = langTags.language(value.language)
  return tag
    ? <span>{tag.descriptions()[0]}</span>
    : <span>{'unknown language: ' + value.language}</span>
}

module.exports = props => {
  let value = props.node.getIn(props.path)
  return (
    <div className="value-input">
      <input
        autoFocus
        type="text"
        className={'input ' + (isValid(value) ? 'bg-white' : 'bg-red')}
        style={{width: '350px'}}
        value={value.value}
        onChange={event => handleChange(event, props)}
        onKeyUp={event => handleKeyUp(event, props)}
      />
      {renderLanguage(value)}
    </div>
  )
}
