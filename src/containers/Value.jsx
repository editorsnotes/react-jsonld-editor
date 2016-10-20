const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {getEditPath} = require('../selectors')
    , EditValue = require('./EditValue')
    , ShowValue = require('./ShowValue')
    , {ignoreDispatch} = require('../utils')

const startsWith = (pathA, pathB) => pathA.slice(0, pathB.count()).equals(pathB)

const mapStateToProps = (state, {path}) => (
  { path
  , editable: startsWith(getEditPath(state), path)
  }
)

const Value = ({path, editable, ...props}) => editable
  ? <EditValue path={path} {...props} />
  : <ShowValue path={path} {...props} />

module.exports = connect(mapStateToProps, ignoreDispatch)(Value)
