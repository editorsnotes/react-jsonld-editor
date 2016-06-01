const React = require('react') // eslint-disable-line no-unused-vars
    , {List} = require('immutable')
    , {JSONLDValue} = require('immutable-jsonld')

var EditNode = null // circular dependency between components

const renderObject = o => (
  JSONLDValue.isJSONLDValue(o) ? <Value value={o}/> : <EditNode/>
)

const renderEditObject = o => (
  JSONLDValue.isJSONLDValue(o) ? <EditValue/> : <EditNode/>
)

const ObjectList = ({objects, editing}) => {
  if (EditNode === null) {
    // circular dependency between components
    EditNode = require('./EditNode')
  }
  return (
    <ul className="list-reset ml3">{
      objects.map(
      (o,i) => i === editing ? renderEditObject(o) : renderObject(o))
    }</ul>
  )
}

ObjectList.propTypes = {
  objects: React.PropTypes.instanceOf(List).isRequired,
  editing: React.PropTypes.number
}

module.exports = ObjectList

