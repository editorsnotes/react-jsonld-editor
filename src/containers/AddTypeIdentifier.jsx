const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , ResourceChooser = require('../components/ResourceChooser')
    , {rdfs} = require('../namespaces')
    , {makeNode} = require('../utils')
    , { getInput
      , getClasses
      , getClassSuggestions
      , getSelectedSuggestion
      , getIdMinter
      } = require('../selectors')
    , actions = require('../actions')

const mapStateToProps = state => (
  { input: getInput(state)
  , suggestions: getClassSuggestions(state)
  , selectedSuggestion: getSelectedSuggestion(state)
  , classes: getClasses(state)
  , idMinter: getIdMinter(state)
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const addNewClass = (id, label, classes, updateClasses) => {
  updateClasses(classes.set(id, makeNode(id, label, rdfs('Class'))))
  return id
}

const mergeProps = (
  {input, suggestions, selectedSuggestion, classes, idMinter},
  {updateInput, updateSelectedSuggestion, updateClasses, cancelChange},
  {onAccept}) => (

  { input
  , suggestions
  , selectedSuggestion
  , cancelChange
  , onChange:
      e => updateInput(e.target.value)
  , onSuggestionSelected:
      (_, {suggestion}) => updateSelectedSuggestion(suggestion)
  , onAccept:
      selectedSuggestion.id
        ? () => onAccept(selectedSuggestion.id)
        : idMinter
            ? () => onAccept(
                addNewClass(idMinter(), input, classes, updateClasses))
            : null
  }
)

module.exports = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(ResourceChooser)
