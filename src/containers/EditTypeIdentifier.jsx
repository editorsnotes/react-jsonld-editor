const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , ResourceChooser = require('../components/ResourceChooser')
    , {getEditInput, getSuggestions, getEditChange} = require('../selectors')
    , {updateChange, acceptChange, cancelChange} = require('../actions')

const mapStateToProps = state => (
  { value: getEditInput(state)
  , suggestions: getSuggestions(state)
  , change: getEditChange(state)
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateChange, acceptChange, cancelChange}, dispatch)

const mergeProps = (
  {value, suggestions, change},
  {updateChange, acceptChange, cancelChange},
  {path}) => (

  { value
  , suggestions

  , onChange: e => updateChange(
      path,
      '',
      e.target.value)

  , onSuggestionSelected: (_, {suggestion}) => updateChange(
      path,
      suggestion.id,
      suggestion.label,
      suggestion)

  , onAccept: () => acceptChange(path, change)
  , onCancel: () => cancelChange()
  }
)

module.exports = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(ResourceChooser)
