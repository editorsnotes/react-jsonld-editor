const React = require('react') // eslint-disable-line no-unused-vars
    , {JSONLDValue} = require('immutable-jsonld')
    , DeleteButton = require('./DeleteButton')
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

const Value = ({value, onClick = ()=>{}, onClickDelete = null}) => (
  <span
    onClick={onClick}
    style={
      { color: '#fff'
      , backgroundColor: '#aaa'
      , fontWeight: 'bold'
      , borderRadius: '1.5em'
      , display: 'inline-block'
      , padding: '0.4em 0.6em'
      , cursor: 'pointer'
      }
    }
  >
    <span style={{marginRight: '0.4em'}}>{show(value)}</span>
    {onClickDelete
      ? (
          <DeleteButton
            size="20px"
            onClick={e => {
              e.preventDefault()
              onClickDelete()
            }}
          />
        )
      : null
    }
  </span>
)

Value.propTypes = {
  value: React.PropTypes.instanceOf(JSONLDValue).isRequired,
  onClick: React.PropTypes.func,
  onClickDelete: React.PropTypes.func
}

module.exports = Value
