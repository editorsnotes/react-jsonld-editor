const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {Set} = require('immutable')
    , {deleteIn, updateEditPath} = require('../actions')
    , {getNode} = require('../selectors')
    , Chip = require('../components/Chip')
    , {xsd} = require('../namespaces')

const NON_TEXT_TYPES = Set.of(
  xsd('dateTime'),
  xsd('float'),
  xsd('integer'),
  xsd('gYear')
)
const notText = type => NON_TEXT_TYPES.includes(type)

const show = value => {
  switch (typeof(value.value)) {
    case 'string':
      return notText(value.type) ? `${value.value}` : `“${value.value}”`
    default:
      return `${value.value}`
  }
}

const mapStateToProps = (state, {path}) => ({value: getNode(state).getIn(path)})

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateEditPath, deleteIn}, dispatch)

const mergeProps = (
  {value},
  {updateEditPath, deleteIn},
  {path, deletable = true, ...props}) => (

  { children: show(value)
  , onClick: () => updateEditPath(path)
  , onClickDelete: deletable ? () => deleteIn(path) : null
  , ...props
  }
)

module.exports = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Chip)
