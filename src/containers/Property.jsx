const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {List} = require('immutable')
    , {getEditPath} = require('../selectors')
    , EditProperty = require('./EditProperty')
    , ShowProperty = require('./ShowProperty')

const Property = ({path, label, editable}) => editable
  ? <EditProperty path={path} />
  : <ShowProperty path={path} label={label} />

Property.propTypes = {
  path: React.PropTypes.instanceOf(List).isRequired,
  label: React.PropTypes.string,
  editable: React.PropTypes.bool
}

const mapStateToProps = (state, {path, label}) => (
  { path
  , label
  , editable: path.equals(getEditPath(state))
  }
)

module.exports = connect(mapStateToProps)(Property)
