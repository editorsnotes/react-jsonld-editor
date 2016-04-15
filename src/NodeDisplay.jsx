"use strict"

const React = require('react') // eslint-disable-line no-unused-vars
    , {labelFor} = require('./utils')

module.exports = ({id, labels}) => (
  <div>
    <button className="btn btn-primary bg-gray mr1">
      <span className="mr1">x</span>
      <span>{labelFor(labels, id)}</span>
    </button>
    <a href={id} className="inline-block text-decoration-none h1">&#10144;</a>
  </div>
)
