const React = require('react') // eslint-disable-line no-unused-vars
    , {JSONLDValue} = require('immutable-jsonld')
    , RoundedRectangle = require('./RoundedRectangle')
    , {XSD} = require('../namespaces')

const show = value => {
  switch (typeof(value.value)) {
    case 'string':
      switch (value.type) {
        case XSD.dateTime:
        case XSD.float:
        case XSD.integer:
        case XSD.gYear:
          return `${value.value}`
        default:
          return `“${value.value}”`
      }
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
