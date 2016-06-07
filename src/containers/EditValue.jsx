const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {JSONLDValue} = require('immutable-jsonld')
    , langTags = require('language-tags')
    , validator = require('validator')
    , {XSD, RDFS} = require('../namespaces')
    , {getEditChange} = require('../selectors')
    , {updateChange, acceptChange, cancelChange} = require('../actions')
    , {positionInputCaret} = require('../utils')

const VALIDATORS = {
  [RDFS.Literal]: () => true,
  [XSD.anyAtomicType]: () => true,
  [XSD.dateTime]: s => validator.isDate(s),
  [XSD.float]: s => validator.isFloat(s),
  [XSD.gYear]: s => validator.isDate(s),
  [XSD.integer]: s => validator.isInt(s),
  [XSD.string]: () => true
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

const Value = ({value, onChange, onAccept, onCancel}) => (
  <div>
    <button
      className="btn btn-primary white bg-red"
      onMouseDown={() => onCancel()}
    >X</button>

    <button
      className="btn btn-primary white bg-green"
      onMouseDown={() => onAccept()}
    >&#10003;</button>

    <input
      type="text"
      className={'input border border-silver '
        + (isValid(value) ? 'bg-white' : 'bg-red')}
      value={value.value}
      ref={positionInputCaret(String(value).length)}
      onChange={onChange}
      onBlur={onCancel}
      onKeyUp={event => { if (event.key === 'Enter') onAccept() }}
    />
    {renderLanguage(value)}
  </div>
)

Value.propTypes = {
  value: React.PropTypes.instanceOf(JSONLDValue).isRequired,
  onChange: React.PropTypes.func.isRequired,
  onAccept: React.PropTypes.func.isRequired
}

const mapStateToProps = state => ({value: getEditChange(state)})

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateChange, acceptChange, cancelChange}, dispatch)

const mergeProps = (
  {value}, {updateChange, acceptChange, cancelChange}, {path}) => (

  { value

  , onChange: e => updateChange(
      path,
      value.set('@value', e.target.value),
      e.target.value)

  , onAccept: () => acceptChange(path, value)
  , onCancel: () => cancelChange()
  }
)

module.exports = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(Value)
