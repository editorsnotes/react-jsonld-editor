const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {List} = require('immutable')
    , EditValue = require('./EditValue')
    , ShowValue = require('./ShowValue')

const Value = ({path, editable}) => editable
  ? <EditValue path={path} />
  : <ShowValue path={path} />

Value.propTypes = {
  path: React.PropTypes.instanceOf(List).isRequired,
  editable: React.PropTypes.bool
}

const mapStateToProps = (state, {path}) => {
  return (
    { path
    , editable: path.equals(state.editPath)
    }
  )
}

module.exports = connect(mapStateToProps)(Value)
