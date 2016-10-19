const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , { getInput
      , getEditPath
      , getSuggestions
      , getIndividualSuggester
      , getIndividuals
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
  , findSuggestions: getIndividualSuggester(state)
  , editPath: getEditPath(state)
  , nodes: getIndividuals(state)
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateEditPath, updateInput, updateSuggestions, setIn}, dispatch)

const mergeProps = (
  {input, suggestions, findSuggestions, editPath, nodes},
  {updateEditPath, updateInput, updateSuggestions, setIn},
  {path, ...props}) => (

  { name: 'new_node'
  , label: 'New value'
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
      setIn(
        path,
        nodes.get(suggestion.id),
        {editPath: path.set(-1, path.last() + 1)}
      )
    }
  , focused: editPath.equals(path)
  , ...props
  }
)

const AddNode = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(Autosuggest)

module.exports = AddNode
