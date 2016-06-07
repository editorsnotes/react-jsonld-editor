const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , Identifier = require('../components/Identifier')
    , {deleteIn} = require('../actions')
    , {getEditedNode} = require('../selectors')

const mapStateToProps = (state, {path, domain}) => {
  let id = getEditedNode(state).getIn(path)
  return (
    { id
    , path
    , domain
    , label: state.labels.get(id)
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
