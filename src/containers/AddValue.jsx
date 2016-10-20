const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {Input} = require('rebass')
    , {JSONLDValue} = require('immutable-jsonld')
    , {getInput, getEditPath, getPredicateRangeFinder} = require('../selectors')
    , {updateEditPath, updateInput, setIn} = require('../actions')

const mapStateToProps = state => (
  { input: getInput(state)
  , editPath: getEditPath(state)
  , getPredicateRange: getPredicateRangeFinder(state)
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateEditPath, updateInput, setIn}, dispatch)

const mergeProps = (
  {input, editPath, getPredicateRange},
  {updateEditPath, updateInput, setIn},
  {path, ...props}) => {
  return (
    { path
    , label: 'New value'
    , placeholder: 'New value'
    , name: path.join('|')
    , value: editPath.equals(path) ? input : ''
    , mb: 0
    , hideLabel: true
    , onFocus: () => updateEditPath(path)
    , onChange: e => updateInput(e.target.value)
    , onKeyDown: e => {
        if (e.key === 'Enter') {
          const value = JSONLDValue().set('@value', e.target.value)
          const type = getPredicateRange(path.last()).first()
          setIn(
            path,
            type ? value.set('@type', type) : value,
            {editPath: path.set(-1, path.last() + 1)}
          )
        }
      }
    , baseRef: input => {
        if (input && editPath.equals(path)) { input.focus() }
      }
    , ...props
    }
  )
}

const AddValue = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(Input)

module.exports = AddValue
