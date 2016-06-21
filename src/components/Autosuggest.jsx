const React = require('react') // eslint-disable-line no-unused-vars
    , Autosuggest = require('react-autosuggest')
    , {positionInputCaret} = require('../utils')

const getSuggestionValue = suggestion => suggestion.label

const renderSuggestion = suggestion => <span>{suggestion.label}</span>

const matches = (inputValue, inputLength) => label => label
  ? label.value.toLowerCase().slice(0, inputLength) === inputValue
  : false

const getSuggestions = (input, domain) => {
  const inputValue = String(input).trim().toLowerCase()
  const inputLength = inputValue.length
  const matchesInput = matches(inputValue, inputLength)
  return inputLength === 0
    ? []
    : domain.valueSeq()
        .filter(node => matchesInput(node.preferredLabel()))
        .map(node => ({id: node.id, label: node.preferredLabel().value}))
        .toArray()
}

module.exports = (
  { input
  , domain
  , onChange
  , onSuggestionSelected
  , onKeyUp
  }) => (
  <Autosuggest
    suggestions={getSuggestions(input, domain)}
    onSuggestionSelected={onSuggestionSelected}
    getSuggestionValue={getSuggestionValue}
    renderSuggestion={renderSuggestion}
    focusInputOnSuggestionClick={false}
    inputProps={
      { value: input
      , onChange
      , onKeyUp
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
