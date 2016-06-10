const React = require('react') // eslint-disable-line no-unused-vars
    , Autosuggest = require('react-autosuggest')
    , {positionInputCaret} = require('../utils')

const getSuggestionValue = suggestion => suggestion.label

const renderSuggestion = suggestion => <span>{suggestion.label}</span>

module.exports = (
  { suggestions
  , onSuggestionSelected
  , input
  , onChange
  }) => (
  <Autosuggest
    suggestions={suggestions}
    onSuggestionSelected={onSuggestionSelected}
    getSuggestionValue={getSuggestionValue}
    renderSuggestion={renderSuggestion}
    focusInputOnSuggestionClick={false}
    inputProps={
      { value: input
      , onChange
      , ref: positionInputCaret(input.length)
      }
    }
    theme={
      { container: 'inline-block relative suggest'
      , input: 'input mr1 border border-silver'
      , suggestionsContainer: `dropdown absolute m0 p0 list-reset border
 border-silver bg-white z2 rounded-bottom`
      , suggestion: 'cursor-pointer px2 py1'
      , suggestionFocused: 'bg-silver'
      }
    }
 />
)
