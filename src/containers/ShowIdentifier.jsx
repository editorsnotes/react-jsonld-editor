const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , Identifier = require('../components/Identifier')
    , {deleteIn} = require('../actions')
    , {getEditedNode, getLabelResolver} = require('../selectors')

const mapStateToProps = (state, {path}) => {
  let id = getEditedNode(state).getIn(path)
  return (
    { id
    , path
    , label: getLabelResolver(state)(id)
    }
  )
}

const mapDispatchToProps = (dispatch, {path, deletable = true}) => {
  let props = {}
  if (deletable) {
    props.onClickDelete = () => {
      dispatch(deleteIn(path.last() === '@id' ? path.butLast() : path))
    }
  }
  return props
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Identifier)
