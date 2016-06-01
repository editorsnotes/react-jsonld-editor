const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , ResourceChooser = require('../components/ResourceChooser')
    , { updateInput, setIdentifier, finishEdit, deleteIn
      , requestSuggestions } = require('../actions')

const mapStateToProps = (state, {path}) => {
  let id = state.node.getIn(path)
  return (
    { value: state.input || state.labels.get(id, id)
    , suggestions: state.suggestions
    }
  )
}

const mapDispatchToProps = (dispatch, {path, domain}) => {
  return (
    { onChange:
        e => dispatch(updateInput(e.target.value))
    , onSuggestionSelected:
        (_, {suggestion}) => dispatch(
          setIdentifier(path, suggestion.id, suggestion.label))
    , onSuggestionsUpdateRequested:
        ({value}) => dispatch(requestSuggestions(value, domain))
    , onAccept:
        () => dispatch(finishEdit())
    , onCancel:
        () => dispatch(deleteIn(path))
    }
  )
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ResourceChooser)
