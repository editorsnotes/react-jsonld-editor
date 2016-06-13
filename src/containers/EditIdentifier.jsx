const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {List} = require('immutable')
    , {JSONLDValue} = require('immutable-jsonld')
    , ResourceChooser = require('../components/ResourceChooser')
    , {RDFS, XSD} = require('../namespaces')
    , {getInput, getSuggestions, getChange} = require('../selectors')
    , {updateChange, acceptChange, cancelChange} = require('../actions')

const setLabel = (node, label) => node.set(
  RDFS.label,
  List.of(JSONLDValue({'@type': XSD.string, '@value': label}))
)

const mapStateToProps = state => (
  { input: getInput(state)
  , suggestions: getSuggestions(state)
  , change: getChange(state)
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateChange, acceptChange, cancelChange}, dispatch)

const mergeProps = (
  {input, suggestions, change},
  {updateChange, acceptChange, cancelChange},
  {path}) => (

  { input
  , suggestions

  , onChange: e => updateChange(
      path.butLast(),
      setLabel(change, e.target.value),
      false,
      e.target.value)

  , onSuggestionSelected: (_, {suggestion}) => updateChange(
      path.butLast(),
      change
        .remove(RDFS.label)
        .set('@id', suggestion.id),
      false,
      suggestion.label,
      suggestion)

  , onAccept: () => acceptChange(path.butLast(), change)
  , onCancel: () => cancelChange()
  }
)

module.exports = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(ResourceChooser)
