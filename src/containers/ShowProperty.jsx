const React = require('react') // eslint-disable-line no-unused-vars
    , {bindActionCreators} = require('redux')
    , {connect} = require('react-redux')
    , {List} = require('immutable')
    , {Text} = require('rebass')
    , {JSONLDValue} = require('immutable-jsonld')
    , {updateEditPath} = require('../actions')
    , { getNode
      , getLabelResolver
      , getProperties
      } = require('../selectors')
    , {keyFromPath} = require('../utils')
    , FlexRow = require('../components/FlexRow')
    , Value = require('../containers/Value')
    , ShowNode = require('../containers/ShowNode')
    , AddValue = require('../containers/AddValue')
    , AddNode = require('../containers/AddNode')
    , {owl} = require('../namespaces')

const isDatatypeProperty = properties => predicate => properties.has(predicate)
  ? properties.get(predicate).types.includes(owl('DatatypeProperty'))
  : true

const mapStateToProps = (state, {path}) => {
  const id = path.last()
  return (
    { id
    , label: getLabelResolver(state)(id)
    , objects: getNode(state).getIn(path, List())
    , isDatatypeProperty: isDatatypeProperty(getProperties(state))(id)
    }
  )
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateEditPath}, dispatch)

const mergeProps = (
  {id, label, objects, isDatatypeProperty},
  {updateEditPath},
  {path}) => (

  {
    children:
      [ <Text
          onClick={() => updateEditPath(path)}
          style={{cursor: 'pointer'}}
        >
          {label}
        </Text>

      , objects.map((o, i) => React.createElement(
          JSONLDValue.isJSONLDValue(o) ? Value : ShowNode,
          keyFromPath(path.push(i))
        ))

      , React.createElement(
          isDatatypeProperty ? AddValue : AddNode,
          keyFromPath(path.push(objects.count()))
        )
      ]
  }
)

const ShowProperty = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(FlexRow)

ShowProperty.displayName = 'ShowProperty'

module.exports = ShowProperty
