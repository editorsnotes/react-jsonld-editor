const React = require('react') // eslint-disable-line no-unused-vars
    , {JSONLDValue} = require('immutable-jsonld')
    , RoundedRectangle = require('./RoundedRectangle')
    , DeletableRoundedRectangle = require('./DeletableRoundedRectangle')
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

const Value = ({value, onClick = null, onClickDelete = null}) => onClickDelete
  ? <DeletableRoundedRectangle
      text={show(value)}
      classes={`bg-gray ${onClick ? '' : 'muted'}`}
      onClick={onClick}
      onClickDelete={onClickDelete}
    />
  : <RoundedRectangle
      text={show(value)}
      classes={`bg-gray ${onClick ? '' : 'muted'}`}
      onClick={onClick}
    />

Value.propTypes = {
  value: React.PropTypes.instanceOf(JSONLDValue).isRequired,
  onClick: React.PropTypes.func,
  onClickDelete: React.PropTypes.func
}

module.exports = Value
