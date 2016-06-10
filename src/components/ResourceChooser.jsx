const React = require('react')
    , Autosuggest = require('./Autosuggest')
    , TextButton = require('./TextButton')

const ResourceChooser = (
  { input = ''
  , suggestions = []
  , onChange
  , onSuggestionSelected
  , onCancel
  , onAccept}) => (

  <div>
    <Autosuggest
      input={input}
      suggestions={suggestions}
      onChange={onChange}
      onSuggestionSelected={onSuggestionSelected}
    />
    <TextButton text="Cancel" onClick={onCancel} />
    <TextButton text="Save" onClick={onAccept} />
  </div>
)

ResourceChooser.propTypes =
  { input: React.PropTypes.string
  , suggestions: React.PropTypes.array
  , onChange: React.PropTypes.func.isRequired
  , onSuggestionSelected: React.PropTypes.func.isRequired
  , onCancel: React.PropTypes.func.isRequired
  , onAccept: React.PropTypes.func.isRequired
  }

module.exports = ResourceChooser
