const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {List} = require('immutable')
    , { getInput
      , getEditPath
      , getSuggestions
      , getPropertySuggester
      , getProperties
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
  , propertyCount: getProperties(state).size
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  { updateEditPath
  , updateInput
  , updateSuggestions
  , setIn
  , newNamedNode
  }, dispatch)

const nodesToSectionedSuggestions = filter => labels => nodes => nodes
  .filter(filter)
  .groupBy(node => node.types.includes(owl('ObjectProperty'))
      ? 'Relations' : 'Properties')
  .update('Properties', nodes => nodes ? nodes : List())
  .update('Relations', nodes => nodes ? nodes : List())
  .entrySeq()
  .map(([title, nodes]) => (
    { title: title
    , suggestions: nodes
        .map(node => (
          { id: node.id
          , label: labels.get(node.id).value
          }
        ))
        .sort(({label: a}, {label: b}) => a.localeCompare(b))
        .toArray()
    }
  ))
  .sort(({title: a}, {title: b}) => a.localeCompare(b))
  .toArray()

const mergeProps = (
  {input, suggestions, findSuggestions, editPath, mintID, propertyCount},
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
        let [properties, relations] = findSuggestions(
            value, nodesToSectionedSuggestions(
              suggestion => (! exclude.includes(suggestion.id))))
        if (value) {
          if (mintID.accepts(owl('ObjectProperty'))) {
            relations.suggestions =
              [ { label: `Create relation “${value}”`
                , type: owl('ObjectProperty')
                , value
                }
              , ...relations.suggestions
              ]
          }
          if (mintID.accepts(owl('DatatypeProperty'))) {
            properties.suggestions =
              [ { label: `Create property “${value}”`
                , type: owl('DatatypeProperty')
                , value
                }
              , ...properties.suggestions
              ]
          }
        }
        updateSuggestions([properties, relations].filter(
          ({suggestions}) => suggestions.length > 0))
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
  , shouldRenderSuggestions: value => (
      propertyCount < 20 || value.trim().length > 0
    )
  , multiSection: true
  , renderSectionTitle: section => section.title
  , getSectionSuggestions: section => section.suggestions
  , focused: editPath.equals(path)
  , updateInput
  , ...props
  }
)

const AddProperty = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(Autosuggest)

AddProperty.displayName = 'AddProperty'

module.exports = AddProperty
