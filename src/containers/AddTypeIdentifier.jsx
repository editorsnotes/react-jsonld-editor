const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , { getInput
      , getEditPath
      , getSuggestions
      , getClassSuggester
      , getIDMinter
      } = require('../selectors')
    , { updateEditPath
      , updateInput
      , updateSuggestions
      , setIn
      , newNamedNode
      } = require('../actions')
    , Autosuggest = require('../components/Autosuggest')
    , {node} = require('../utils')
    , {rdfs} = require('../namespaces')

const mapStateToProps = state => (
  { input: getInput(state)
  , suggestions: getSuggestions(state)
  , findSuggestions: getClassSuggester(state)
  , editPath: getEditPath(state)
  , mintID: getIDMinter(state)
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  { updateEditPath
  , updateInput
  , updateSuggestions
  , setIn
  , newNamedNode
  }, dispatch)

const mergeProps = (
  {input, suggestions, findSuggestions, editPath, mintID},
  {updateEditPath, updateInput, updateSuggestions, setIn, newNamedNode},
  {path, ...props}) => (

  { name: 'new_type_id'
  , label: 'New type'
  , mb: 0
  , hideLabel: true
  , input: editPath.equals(path) ? input : ''
  , suggestions
  , onFocus: () => updateEditPath(path)
  , onBlur: () => updateEditPath(path.pop().pop())
  , onSuggestionsFetchRequested:
      ({value}) => {
        const suggestions = findSuggestions(value)
        updateSuggestions(
          mintID.accepts(rdfs('Class'))
            ? [ { label: `Create type “${value}”`
                , type: rdfs('Class')
                , value
                }
              , ...suggestions
              ]
            : suggestions
        )
      }
  , onSuggestionsClearRequested: () => updateSuggestions([])
  , onSuggestionSelected: (_, {suggestion}) => {
      let id = suggestion.id
      if (! id) {
        id = mintID(suggestion.type)
        newNamedNode(node(id, suggestion.value, [suggestion.type]))
      }
      setIn(path, id, {editPath: path.set(-1, path.last() + 1)})
    }
  , focused: editPath.equals(path)
  , updateInput
  , ...props
  }
)

const AddTypeIdentifier = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(Autosuggest)

AddTypeIdentifier.displayName = 'AddTypeIdentifier'

module.exports = AddTypeIdentifier
