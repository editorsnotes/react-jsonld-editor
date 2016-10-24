const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {List} = require('immutable')
    , { getInput
      , getEditPath
      , getSuggestions
      , getPropertySuggester
      , getIDMinter
      } = require('../selectors')
    , { updateEditPath
      , updateInput
      , updateSuggestions
      , setIn
      , newNamedNode
      } = require('../actions')
    , Autosuggest = require('../components/Autosuggest')
    , {owl} = require('../namespaces')
    , {node} = require('../utils')

const mapStateToProps = state => (
  { input: getInput(state)
  , suggestions: getSuggestions(state)
  , findSuggestions: getPropertySuggester(state)
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
  {path, exclude, ...props}) => (

  { name: 'new_property'
  , label: 'New property or relation'
  , hideLabel: true
  , input: editPath.equals(path) ? input : ''
  , suggestions
  , onFocus: () => updateEditPath(path)
  , onBlur: () => updateEditPath(path.pop())
  , onSuggestionsFetchRequested:
      ({value}) => {
        let suggestions = findSuggestions(value).filter(
          suggestion => (! exclude.includes(suggestion.id)))
        if (value) {
          if (mintID.accepts(owl('ObjectProperty'))) {
            suggestions =
              [ { label: `Create relation “${value}”`
                , type: owl('ObjectProperty')
                , value
                }
              , ...suggestions
              ]
          }
          if (mintID.accepts(owl('DatatypeProperty'))) {
            suggestions =
              [ { label: `Create property “${value}”`
                , type: owl('DatatypeProperty')
                , value
                }
              , ...suggestions
              ]
          }
        }
        updateSuggestions(suggestions)
      }
  , onSuggestionsClearRequested: () => updateSuggestions([])
  , onSuggestionSelected: (_, {suggestion}) => {
      let id = suggestion.id
      if (! id) {
        id = mintID(suggestion.type)
        newNamedNode(node(id, suggestion.value, [suggestion.type]))
      }
      const newPropPath = path.set(-1, id)
      setIn(newPropPath, List(), {editPath: newPropPath.push(0)})
    }
  , shouldRenderSuggestions: () => true
  , focused: editPath.equals(path)
  , updateInput
  , ...props
  }
)

const AddProperty = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(Autosuggest)

AddProperty.displayName = 'AddProperty'

module.exports = AddProperty
