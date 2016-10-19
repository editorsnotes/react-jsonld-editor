const React = require('react') // eslint-disable-line no-unused-vars
    , RebassAutosuggest = require('rebass-autosuggest')

const Autosuggest = (
  { input
  , label
  , focused
  , onFocus
  , onBlur
  , onChange
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
        , onChange: e => { if (e.type === 'change') { onChange(e) }}
        }
      }
      baseRef={input => { if (input && focused) { input.focus() }}}
      {...props}
    />
  )
}

module.exports = Autosuggest
