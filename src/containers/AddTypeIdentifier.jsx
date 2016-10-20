const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , { getInput
      , getEditPath
      , getSuggestions
      , getClassSuggester
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
  , findSuggestions: getClassSuggester(state)
  , editPath: getEditPath(state)
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateEditPath, updateInput, updateSuggestions, setIn}, dispatch)

const mergeProps = (
  {input, suggestions, findSuggestions, editPath},
  {updateEditPath, updateInput, updateSuggestions, setIn},
  {path, ...props}) => (

  { name: 'new_type_id'
  , label: 'New type'
  , mb: 0
  , hideLabel: true
  , input: editPath.equals(path) ? input : ''
  , suggestions
  , onFocus: () => updateEditPath(path)
  , onBlur: () => updateEditPath(path.pop().pop())
  , onChange: e => updateInput(e.target.value)
  , onSuggestionsFetchRequested:
      ({value}) => updateSuggestions(findSuggestions(value))
  , onSuggestionsClearRequested: () => updateSuggestions([])
  , onSuggestionSelected: (_, {suggestion}) => {
      setIn(path, suggestion.id, {editPath: path.set(-1, path.last() + 1)})
    }
  , focused: editPath.equals(path)
  , ...props
  }
)

const AddTypeIdentifier = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(Autosuggest)

module.exports = AddTypeIdentifier
