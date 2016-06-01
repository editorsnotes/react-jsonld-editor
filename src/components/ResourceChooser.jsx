const React = require('react')
    , Autosuggest = require('react-autosuggest')
    , {positionInputCaret} = require('../utils')

const getSuggestionValue = suggestion => suggestion.label

const renderSuggestion = suggestion => <span>{suggestion.label}</span>

const ResourceChooser = (
  { value = ''
  , suggestions = []
  , onChange
  , onSuggestionSelected
  , onSuggestionsUpdateRequested
  , onCancel
  , onAccept}) => (

  <div>

    <button
      className="btn btn-primary white bg-red rounded-left"
      onMouseDown={() => onCancel()}
    >X</button>

    <button
      className="btn btn-primary white bg-green rounded-right"
      onMouseDown={() => onAccept()}
    >&#10003;</button>

    <Autosuggest
      suggestions={suggestions}
      onSuggestionSelected={onSuggestionSelected}
      onSuggestionsUpdateRequested={onSuggestionsUpdateRequested}
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
        , input: 'input border border-silver '
        , suggestionsContainer: `dropdown absolute m0 p0 list-reset border
 border-silver bg-white z2 rounded-bottom`
        , suggestion: 'cursor-pointer px2 py1'
        , suggestionFocused: 'bg-silver'
        }
      }
    />
  </div>
)

ResourceChooser.propTypes =
  { value: React.PropTypes.string
  , suggestions: React.PropTypes.array
  , onChange: React.PropTypes.func.isRequired
  , onSuggestionSelected: React.PropTypes.func.isRequired
  , onSuggestionsUpdateRequested: React.PropTypes.func.isRequired
  , onCancel: React.PropTypes.func.isRequired
  , onAccept: React.PropTypes.func.isRequired
  }

module.exports = ResourceChooser
