const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , ResourceChooser = require('../components/ResourceChooser')
    , { getInput
      , getClasses
      , getSelectedSuggestion
      } = require('../selectors')
    , { updateInput
      , updateSelectedSuggestion
      , cancelChange
      } = require('../actions')

const mapStateToProps = state => (
  { input: getInput(state)
  , selectedSuggestion: getSelectedSuggestion(state)
  , domain: getClasses(state)
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateInput, updateSelectedSuggestion, cancelChange}, dispatch)

const mergeProps = (
  {input, selectedSuggestion, domain},
  {updateInput, updateSelectedSuggestion, cancelChange},
  {onAccept}) => (

  { input
  , selectedSuggestion
  , domain
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
