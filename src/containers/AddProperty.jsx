const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {List} = require('immutable')
    , { getInput
      , getEditPath
      , getSuggestions
      , getPropertySuggester
      } = require('../selectors')
    , { updateEditPath
      , updateInput
      , updateSuggestions
      , setIn
      } = require('../actions')
    , Autosuggest = require('../components/Autosuggest')

const mapStateToProps = state => (
  { input: getInput(state)
  , suggestions: getSuggestions(state)
  , findSuggestions: getPropertySuggester(state)
  , editPath: getEditPath(state)
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateEditPath, updateInput, updateSuggestions, setIn}, dispatch)

const mergeProps = (
  {input, suggestions, findSuggestions, editPath},
  {updateEditPath, updateInput, updateSuggestions, setIn},
  {path, exclude, ...props}) => (

  { placeholder: 'New property'
  , input: editPath.equals(path) ? input : ''
  , suggestions
  , onFocus: () => updateEditPath(path)
  , onBlur: () => updateEditPath(path.pop())
  , onChange: e => updateInput(e.target.value)
  , onSuggestionsFetchRequested:
      ({value}) => updateSuggestions(
        findSuggestions(value).filter(
          suggestion => (! exclude.includes(suggestion.id))
        )
      )
  , onSuggestionsClearRequested: () => updateSuggestions([])
  , onSuggestionSelected: (_, {suggestion}) => {
      const newPropPath = path.set(-1, suggestion.id)
      setIn(newPropPath, List(), {editPath: newPropPath.push(0)})
    }
  , focused: editPath.equals(path)
  , ...props
  }
)

const AddProperty = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(Autosuggest)

module.exports = AddProperty
