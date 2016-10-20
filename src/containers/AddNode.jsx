const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {List} = require('immutable')
    , {JSONLDNode, JSONLDValue} = require('immutable-jsonld')
    , { getInput
      , getEditPath
      , getSuggestions
      , getIndividualSuggester
      , getIndividuals
      , getPredicateRangeFinder
      } = require('../selectors')
    , { updateEditPath
      , updateInput
      , updateSuggestions
      , setIn
      } = require('../actions')
    , Autosuggest = require('../components/Autosuggest')
    , {rdfs} = require('../namespaces')

const mapStateToProps = state => (
  { input: getInput(state)
  , suggestions: getSuggestions(state)
  , findSuggestions: getIndividualSuggester(state)
  , editPath: getEditPath(state)
  , nodes: getIndividuals(state)
  , getPredicateRange: getPredicateRangeFinder(state)
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateEditPath, updateInput, updateSuggestions, setIn}, dispatch)

const BlankNode = (label, types) => JSONLDNode()
  .set(rdfs('label'), List.of(JSONLDValue().set('@value', label)))
  .set('@type', types)

const mergeProps = (
  {input, suggestions, findSuggestions, editPath, nodes, getPredicateRange},
  {updateEditPath, updateInput, updateSuggestions, setIn},
  {path, ...props}) => (

  { name: 'new_node'
  , label: 'New value'
  , mb: 0
  , hideLabel: true
  , input: editPath.equals(path) ? input : ''
  , suggestions
  , onFocus: () => updateEditPath(path)
  , onBlur: () => updateEditPath(path.pop().pop())
  , onChange: e => updateInput(e.target.value)
  , onSuggestionsFetchRequested: ({value}) => {
      updateSuggestions(
        [ {label: `Create “${value}”`}
        , ...findSuggestions(value)
        ]
      )
    }
  , onSuggestionsClearRequested: () => updateSuggestions([])
  , onSuggestionSelected: (_, {suggestion}) => {
      setIn(
        path,
        suggestion.id
          ? nodes.get(suggestion.id)
          : BlankNode(suggestion.label, getPredicateRange(path.last())),
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
