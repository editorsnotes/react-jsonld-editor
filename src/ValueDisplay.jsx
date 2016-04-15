"use strict"

const React = require('react') // eslint-disable-line no-unused-vars
    , {XSD} = require('./namespaces')

const show = value => {
  switch (value.type) {
    case XSD.dateTime:
    case XSD.float:
    case XSD.integer:
    case XSD.gYear:
      return `${value.value}`
    default:
      return `"${value.value}"`
  }
}

module.exports = ({value}) => (
  <button className="btn btn-primary bg-gray">
    <span className="mr1">x</span>
    <span>{show(value)}</span>
  </button>
)
