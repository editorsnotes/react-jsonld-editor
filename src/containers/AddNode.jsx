const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , { getInput
      , getEditPath
      , getSuggestions
      , getIndividualSuggester
      , getIndividuals
      , getPredicateRangeFinder
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
  , findSuggestions: getIndividualSuggester(state)
  , editPath: getEditPath(state)
  , individuals: getIndividuals(state)
  , getPredicateRange: getPredicateRangeFinder(state)
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
  { input
  , suggestions
  , findSuggestions
  , editPath
  , individuals
  , getPredicateRange
  , mintID
  },
  {updateEditPath, updateInput, updateSuggestions, setIn, newNamedNode},
  {path, ...props}) => (

  { name: 'new_node'
  , label: 'New value'
  , mb: 0
  , hideLabel: true
  , input: editPath.equals(path) ? input : ''
  , suggestions
  , onFocus: () => updateEditPath(path)
  , onBlur: () => updateEditPath(path.pop().pop())
  , onSuggestionsFetchRequested: ({value}) => {
      updateSuggestions(
        [ {label: `Create “${value}”`, value}
        , ...findSuggestions(value)
        ]
      )
    }
  , onSuggestionsClearRequested: () => updateSuggestions([])
  , onSuggestionSelected: (_, {suggestion}) => {
      let individual = individuals.get(suggestion.id)
      if (! individual) {
        const types = getPredicateRange(path.butLast().last())
        if (types.some(mintID.accepts) || mintID.accepts(rdfs('Resource'))) {
          // named node
          individual = node(mintID(types.toArray()), suggestion.value, types)
          newNamedNode(individual)
        } else {
          // blank node
          individual = node(undefined, suggestion.value, types)
        }
      }
      setIn(path, individual, {editPath: path.set(-1, path.last() + 1)})
    }
  , focused: editPath.equals(path)
  , updateInput
  , ...props
  }
)

const AddNode = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(Autosuggest)

AddNode.displayName = 'AddNode'

module.exports = AddNode
