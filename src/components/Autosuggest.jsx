const React = require('react') // eslint-disable-line no-unused-vars
    , ReactAutosuggest = require('react-autosuggest')
    , {config, Base} = require('rebass')

const Autosuggest = (
  { input
  , placeholder = 'New value'
  , rounded
  , focused
  , onFocus
  , onBlur
  , onChange
  , ...props
  }, {rebass}) => {

  const { scale
        , colors
        , borderColor
        , borderRadius
        } = { ...config, ...rebass }

  const renderSuggestion = suggestion => <span>{suggestion.label}</span>

  return (
    <Base
      className="Autosuggest"
      {...props}
    >
      <ReactAutosuggest
        getSuggestionValue={suggestion => suggestion.label}
        renderSuggestion={renderSuggestion}
        inputProps={
          { value: input
          , onFocus
          , onBlur
          , onChange: e => { if (e.type === 'change') { onChange(e) }}
          , placeholder
          }
        }
        ref={autosuggest => { if (autosuggest && focused) {
          autosuggest.input.focus()
        }}}
        theme={
          { container:
            { position: 'relative'
            , marginBottom: scale[2]
            }
          , input:
            { fontFamily: 'inherit'
            , fontSize: 'inherit'
            , boxSizing: 'border-box'
            , display: 'block'
            , width: '100%'
            , height: scale[3]
            , margin: 0
            , paddingLeft: scale[1]
            , paddingRight: scale[1]
            , color: 'inherit'
            , backgroundColor: 'rgba(255, 255, 255, .25)'
            , borderWidth: 1
            , borderStyle: 'solid'
            , borderColor
            , borderRadius: rounded ? borderRadius : 0
            }
          , suggestionsContainer:
            { position: 'absolute'
            , left: 0
            , right: 'auto'
            , top: '100%'
            , bottom: 'auto'
            , zIndex: 4
            }
          , suggestionsList:
            { listStyle: 'none'
            , margin: 0
            , padding: 0
            , borderWidth: 1
            , borderStyle: 'solid'
            , borderColor
            , borderRadius
            , color: colors.black
            , backgroundColor: colors.white
            }
          , suggestion:
            { paddingLeft: scale[1]
            , paddingRight: scale[1]
            }
          , suggestionFocused:
            { backgroundColor: colors.gray
            }
          }
        }
        {...props}
      />
    </Base>
  )
}

Autosuggest.propTypes = {
  /** Controls the border radius for creating grouped elements */
  rounded: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.oneOf([
      'top',
      'right',
      'bottom',
      'left'
    ])
  ])
}

Autosuggest.defaultProps = {
  rounded: true
}

Autosuggest.contextTypes = {
  rebass: React.PropTypes.object
}

module.exports = Autosuggest
