const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , ResourceChooser = require('../components/ResourceChooser')
    , { getInput
      , getClassSuggestions
      , getSelectedSuggestion
      } = require('../selectors')
    , { updateInput
      , updateSelectedSuggestion
      , cancelChange
      } = require('../actions')

const mapStateToProps = state => (
  { input: getInput(state)
  , suggestions: getClassSuggestions(state)
  , selectedSuggestion: getSelectedSuggestion(state)
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateInput, updateSelectedSuggestion, cancelChange}, dispatch)

const mergeProps = (
  {input, suggestions,selectedSuggestion},
  {updateInput, updateSelectedSuggestion, cancelChange},
  {onAccept}) => (

  { input
  , suggestions
  , selectedSuggestion
  , cancelChange
  , onChange:
      e => updateInput(e.target.value)
  , onSuggestionSelected:
      (_, {suggestion}) => updateSelectedSuggestion(suggestion)
  , onAccept:
      selectedSuggestion.id ? () => onAccept(selectedSuggestion.id) : null
  }
)

module.exports = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(ResourceChooser)
