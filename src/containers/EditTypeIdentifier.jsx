const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , ResourceChooser = require('../components/ResourceChooser')
    , { getInput
      , getSuggestions
      , getSelectedSuggestion
      , getChange
      } = require('../selectors')
    , { updateInput
      , updateChange
      , acceptChange
      , cancelChange
      } = require('../actions')

const mapStateToProps = state => (
  { input: getInput(state)
  , suggestions: getSuggestions(state)
  , selectedSuggestion: getSelectedSuggestion(state)
  , change: getChange(state)
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateInput, updateChange, acceptChange, cancelChange}, dispatch)

const mergeProps = (
  {input, suggestions, selectedSuggestion, change},
  {updateInput, updateChange, acceptChange, cancelChange},
  {path}) => (

  { input
  , suggestions
  , suggestionSelected: selectedSuggestion.id ? true : false

  , onChange: e => updateInput(e.target.value)

  , onSuggestionSelected: (_, {suggestion}) => updateChange(
      path,
      suggestion.id,
      false,
      suggestion.label,
      suggestion)

  , onAccept: selectedSuggestion.id ? () => acceptChange(path, change) : null
  , onCancel: () => cancelChange()
  }
)

module.exports = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(ResourceChooser)
