const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , validator = require('validator')
    , {xsd, rdfs} = require('../namespaces')
    , {getChange} = require('../selectors')
    , {updateChange, acceptChange, cancelChange} = require('../actions')
    , CancellableInput = require('../components/CancellableInput')

const VALIDATORS = {
  [rdfs('Literal')]: () => true,
  [xsd('anyAtomicType')]: () => true,
  [xsd('dateTime')]: s => validator.isDate(s),
  [xsd('float')]: s => validator.isFloat(s),
  [xsd('gYear')]: s => validator.isDate(s),
  [xsd('integer')]: s => validator.isInt(s),
  [xsd('string')]: () => true
}

const isValid = value =>
  VALIDATORS[value.type || xsd('anyAtomicType')](value.value + '')

const mapStateToProps = state => {
  let value = getChange(state)
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
      false,
      e.target.value)

  , onAccept: () => acceptChange(path, value)
  , onCancel: () => cancelChange()
  }
)

module.exports = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(CancellableInput)
