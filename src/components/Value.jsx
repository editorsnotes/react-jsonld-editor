const React = require('react') // eslint-disable-line no-unused-vars
    , {Set} = require('immutable')
    , {JSONLDValue} = require('immutable-jsonld')
    , RoundedRectangle = require('./RoundedRectangle')
    , {xsd} = require('../namespaces')

const NON_TEXT_TYPES = Set.of(
  xsd('dateTime'),
  xsd('float'),
  xsd('integer'),
  xsd('gYear')
)
const notText = type => NON_TEXT_TYPES.includes(type)

const show = value => {
  switch (typeof(value.value)) {
    case 'string':
      return notText(value.type) ? `${value.value}` : `“${value.value}”`
    default:
      return `${value.value}`
  }
}

const Value = ({value, onClick = null, onClickDelete = null}) => (
  <RoundedRectangle
    text={show(value)}
    classes="bg-gray"
    onClick={onClick}
    onClickDelete={onClickDelete}
  />
)

Value.propTypes = {
  value: React.PropTypes.instanceOf(JSONLDValue).isRequired,
  onClick: React.PropTypes.func,
  onClickDelete: React.PropTypes.func
}

module.exports = Value
