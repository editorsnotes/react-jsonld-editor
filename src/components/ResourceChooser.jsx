const React = require('react')
    , {Map} = require('immutable')
    , Autosuggest = require('./Autosuggest')
    , TextButton = require('./TextButton')

const ResourceChooser = (
  { input = ''
  , selectedSuggestion = {}
  , domain
  , cancelChange
  , onChange
  , onSuggestionSelected
  , onAccept}) => (

  <div>
    <Autosuggest
      input={input}
      domain={domain}
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
  , selectedSuggestion: React.PropTypes.object
  , domain: React.PropTypes.instanceOf(Map).isRequired
  , cancelChange: React.PropTypes.func.isRequired
  , onChange: React.PropTypes.func.isRequired
  , onSuggestionSelected: React.PropTypes.func.isRequired
  , onAccept: React.PropTypes.func
  }

module.exports = ResourceChooser
