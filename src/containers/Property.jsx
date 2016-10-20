const React = require('react') // eslint-disable-line no-unused-vars
    , {bindActionCreators} = require('redux')
    , {connect} = require('react-redux')
    , {List} = require('immutable')
    , {Text} = require('rebass')
    , {JSONLDValue} = require('immutable-jsonld')
    , {updateEditPath, deleteIn} = require('../actions')
    , { getNode
      , getLabelResolver
      , getProperties
      , isEditingProperties
      } = require('../selectors')
    , {keyFromPath} = require('../utils')
    , FlexRow = require('../components/FlexRow')
    , RemoveButton = require('../components/RemoveButton')
    , Value = require('./Value')
    , ShowNode = require('./ShowNode')
    , AddValue = require('./AddValue')
    , AddNode = require('./AddNode')
    , {owl} = require('../namespaces')

const isObjectProperty = properties => predicate => properties.has(predicate)
  ? properties.get(predicate).types.includes(owl('ObjectProperty'))
  : true

const mapStateToProps = (state, {path}) => {
  const id = path.last()
  return (
    { id
    , label: getLabelResolver(state)(id)
    , objects: getNode(state).getIn(path, List())
    , isObjectProperty: isObjectProperty(getProperties(state))(id)
    , deletable: isEditingProperties(state)
    }
  )
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateEditPath, deleteIn}, dispatch)

const mergeProps = (
  {id, label, objects, isObjectProperty, deletable},
  {updateEditPath, deleteIn},
  {path}) => {
  const children =
    [ <Text>{label}</Text>

    , objects.map((o, i) => React.createElement(
        JSONLDValue.isJSONLDValue(o) ? Value : ShowNode,
        keyFromPath(path.push(i))
      ))

    , React.createElement(
        isObjectProperty ? AddNode : AddValue,
        keyFromPath(path.push(objects.count()))
      )
    ]
  return (
    { children: deletable
        ? [ <RemoveButton
              color="red"
              style={{paddingTop: '4px'}}
              onClick={() => deleteIn(path)}
            />
          , ...children
          ]
        : children
    }
  )
}

const Property = connect(
  mapStateToProps, mapDispatchToProps, mergeProps)(FlexRow)

Property.displayName = 'Property'

module.exports = Property
