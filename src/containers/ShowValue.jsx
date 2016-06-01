const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {List} = require('immutable')
    , {JSONLDValue} = require('immutable-jsonld')
    , {XSD} = require('../namespaces')
    , {startEditValue} = require('../actions')

const show = value => {
  switch (typeof(value.value)) {
    case 'string':
      switch (value.type) {
        case XSD.dateTime:
        case XSD.float:
        case XSD.integer:
        case XSD.gYear:
          return `${value.value}`
        default:
          return `"${value.value}"`
      }
    default:
      return `${value.value}`
  }
}

const Value = ({value, path, startEdit}) => (
  <button
    className="btn btn-primary bg-gray"
    onClick={() => startEdit(path, value.value)}
  >
    <span>{show(value)}</span>
  </button>
)

Value.propTypes = {
  value: React.PropTypes.instanceOf(JSONLDValue).isRequired,
  path: React.PropTypes.instanceOf(List).isRequired,
  startEdit: React.PropTypes.func.isRequired
}

const mapStateToProps = (state, {path}) => {
  return {value: state.node.getIn(path), path}
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {startEdit: startEditValue}, dispatch)

module.exports = connect(mapStateToProps, mapDispatchToProps)(Value)
