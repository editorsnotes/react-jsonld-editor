const React = require('react') // eslint-disable-line no-unused-vars
    , RebassAutosuggest = require('rebass-autosuggest')

const Autosuggest = (
  { input
  , label
  , focused
  , onFocus
  , onBlur
  , updateInput
  , ...props
  }) => {

  return (
    <RebassAutosuggest
      label={label}
      getSuggestionValue={suggestion => suggestion.label}
      renderSuggestion={suggestion => suggestion.label}
      inputProps={
        { value: input
        , placeholder: label
        , onFocus
        , onBlur
        , onChange:
          (e, {newValue, method}) => {
            if (method === 'type') { updateInput(newValue) }
          }
        }
      }
      baseRef={input => { if (input && focused) { input.focus() }}}
      {...props}
    />
  )
}

module.exports = Autosuggest
