const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {JSONLDValue} = require('immutable-jsonld')
    , langTags = require('language-tags')
    , validator = require('validator')
    , {XSD, RDFS} = require('../namespaces')
    , {setValue, finishEdit, deleteIn} = require('../actions')
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

const Value = ({value, onChange, onFinishEdit, onDelete}) => (
  <div>
    <button
      className="btn btn-primary white bg-red"
      onMouseDown={() => onDelete()}
    >X</button>

    <button
      className="btn btn-primary white bg-green"
      onMouseDown={() => onFinishEdit()}
    >&#10003;</button>

    <input
      type="text"
      className={'input border border-silver '
        + (isValid(value) ? 'bg-white' : 'bg-red')}
      value={value.value}
      ref={positionInputCaret(String(value).length)}
      onChange={event => onChange(value.set('@value', event.target.value))}
      onBlur={() => onFinishEdit()}
      onKeyUp={event => { if (event.key === 'Enter') onFinishEdit() }}
    />
    {renderLanguage(value)}
  </div>
)

Value.propTypes = {
  value: React.PropTypes.instanceOf(JSONLDValue).isRequired,
  onChange: React.PropTypes.func.isRequired,
  onFinishEdit: React.PropTypes.func.isRequired
}

const mapStateToProps = (state, {path}) => {
  return {
    value: state.node.getIn(path),
    path
  }
}

const mapDispatchToProps = (dispatch, {path}) => {
  return {
    onChange: value => dispatch(setValue(path, value)),
    onFinishEdit: () => dispatch(finishEdit()),
    onDelete: () => dispatch(deleteIn(path))
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Value)
