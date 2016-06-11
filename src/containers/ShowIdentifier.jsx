const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , Identifier = require('../components/Identifier')
    , {deleteIn} = require('../actions')
    , { getEditedNode
      , getLabelResolver
      , isEditingProperties
      } = require('../selectors')

const mapStateToProps = (state, {path, disabled = false}) => {
  let id = getEditedNode(state).getIn(path)
  return (
    { id
    , path
    , label: getLabelResolver(state)(id)
    , interactive: (! (disabled || isEditingProperties(state)))
    }
  )
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {deleteIn}, dispatch)

const mergeProps = ({id, path, label, interactive}, {deleteIn}) => (
  { id
  , label
  , onClick:
      interactive
        ? () => window.open(id, '_blank')
        : null
  , onClickDelete:
      interactive
        ? () => deleteIn(path.last() === '@id' ? path.butLast() : path)
        : null
  }
)

module.exports = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(Identifier)
