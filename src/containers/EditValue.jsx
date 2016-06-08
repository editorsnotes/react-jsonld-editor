const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , validator = require('validator')
    , {XSD, RDFS} = require('../namespaces')
    , {getEditChange} = require('../selectors')
    , {updateChange, acceptChange, cancelChange} = require('../actions')
    , CancellableInput = require('../components/CancellableInput')

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

const mapStateToProps = state => {
  let value = getEditChange(state)
  return (
    { value
    , input: value.value
    , classes: isValid(value) ? 'bg-white' : 'bg-red'
    }
  )
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateChange, acceptChange, cancelChange}, dispatch)

const mergeProps = (
  {value, input, classes},
  {updateChange, acceptChange, cancelChange},
  {path}) => (

  { input
  , classes

  , onChange: e => updateChange(
      path,
      value.set('@value', e.target.value),
      e.target.value)

  , onAccept: () => acceptChange(path, value)
  , onCancel: () => cancelChange()
  }
)

module.exports = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(CancellableInput)
