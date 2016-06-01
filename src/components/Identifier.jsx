const React = require('react') // eslint-disable-line no-unused-vars
    , {List} = require('immutable')
    , {DOMAINS} = require('../universe')

const Identifier = ({id, path, domain, label = id, startEdit}) => (
  <div>
    <button
      className="btn btn-primary bg-gray mr1"
      onClick={() => startEdit(path, label, domain)}
    >{label}</button>
    <a
      href={id}
      className="inline-block text-decoration-none h1"
    >&#10144;</a>
  </div>
)

Identifier.propTypes = {
  id: React.PropTypes.string.isRequired,
  path: React.PropTypes.instanceOf(List).isRequired,
  domain: React.PropTypes.oneOf(DOMAINS).isRequired,
  label: React.PropTypes.string,
  startEdit: React.PropTypes.func.isRequired
}

module.exports = Identifier
