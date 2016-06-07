const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {List} = require('immutable')
    , ResourceChooser = require('../components/ResourceChooser')
    , {getEditInput, getSuggestions} = require('../selectors')
    , {updateChange, acceptChange, cancelChange} = require('../actions')

const mapStateToProps = state => (
  { value: getEditInput(state)
  , suggestions: getSuggestions(state)
  }
)

const mapDispatchToProps = (dispatch, {path}) => {
  return (
    { onChange:
        e => dispatch(
          updateChange(
            path,
            List(),
            e.target.value))
    , onSuggestionSelected:
        (_, {suggestion}) => dispatch(
          updateChange(
            path.butLast().push(suggestion.id),
            List(),
            suggestion.label,
            suggestion
          )
        )
    , onAccept: () => dispatch(acceptChange(path, List()))
    , onCancel: () => dispatch(cancelChange())
    }
  )
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ResourceChooser)
