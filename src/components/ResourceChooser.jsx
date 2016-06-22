const React = require('react')
    , Autosuggest = require('./Autosuggest')
    , TextButton = require('./TextButton')

const ResourceChooser = (
  { input = ''
  , suggestions
  , selectedSuggestion = {}
  , cancelChange
  , onChange
  , onSuggestionSelected
  , onAccept}) => (

  <div>
    <Autosuggest
      input={input}
      suggestions={suggestions}
      onChange={onChange}
      onSuggestionSelected={onSuggestionSelected}
      onKeyUp={event => {
        if (selectedSuggestion.id && event.key === 'Enter') {
          onAccept()
        }
      }}
    />
    <TextButton text="Cancel" onClick={() => cancelChange()} />
    <TextButton text="Save" onClick={onAccept} />
  </div>
)

ResourceChooser.propTypes =
  { input: React.PropTypes.string
  , suggestions: React.PropTypes.array.isRequired
  , selectedSuggestion: React.PropTypes.object
  , cancelChange: React.PropTypes.func.isRequired
  , onChange: React.PropTypes.func.isRequired
  , onSuggestionSelected: React.PropTypes.func.isRequired
  , onAccept: React.PropTypes.func
  }

module.exports = ResourceChooser
