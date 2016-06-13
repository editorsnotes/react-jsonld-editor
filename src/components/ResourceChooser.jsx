const React = require('react')
    , Autosuggest = require('./Autosuggest')
    , TextButton = require('./TextButton')

const ResourceChooser = (
  { input = ''
  , suggestions = []
  , suggestionSelected
  , onChange
  , onSuggestionSelected
  , onCancel
  , onAccept}) => (

  <div>
    <Autosuggest
      input={input}
      suggestions={suggestions}
      onChange={onChange}
      onKeyUp={event => {
        if (suggestionSelected && event.key === 'Enter') {
          onAccept()
        }
      }}
      onSuggestionSelected={onSuggestionSelected}
    />
    <TextButton text="Cancel" onClick={onCancel} />
    <TextButton text="Save" onClick={onAccept} />
  </div>
)

ResourceChooser.propTypes =
  { input: React.PropTypes.string
  , suggestions: React.PropTypes.array
  , suggestionSelected: React.PropTypes.bool
  , onChange: React.PropTypes.func.isRequired
  , onSuggestionSelected: React.PropTypes.func.isRequired
  , onCancel: React.PropTypes.func.isRequired
  , onAccept: React.PropTypes.func.isRequired
  }

module.exports = ResourceChooser
