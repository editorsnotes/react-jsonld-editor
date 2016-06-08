const React = require('react')
    , Autosuggest = require('react-autosuggest')
    , TextButton = require('./TextButton')
    , {positionInputCaret} = require('../utils')

const getSuggestionValue = suggestion => suggestion.label

const renderSuggestion = suggestion => <span>{suggestion.label}</span>

const ResourceChooser = (
  { value = ''
  , suggestions = []
  , onChange
  , onSuggestionSelected
  , onCancel
  , onAccept}) => (

  <div>
    <Autosuggest
      suggestions={suggestions}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      focusInputOnSuggestionClick={false}
      inputProps={
        { value
        , onChange
        , ref: positionInputCaret(value.length)
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
    <TextButton text="Cancel" onClick={onCancel} />
    <TextButton text="Save" onClick={onAccept} />
  </div>
)

ResourceChooser.propTypes =
  { value: React.PropTypes.string
  , suggestions: React.PropTypes.array
  , onChange: React.PropTypes.func.isRequired
  , onSuggestionSelected: React.PropTypes.func.isRequired
  , onCancel: React.PropTypes.func.isRequired
  , onAccept: React.PropTypes.func.isRequired
  }

module.exports = ResourceChooser
