const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {List} = require('immutable')
    , { config
      , Panel
      , PanelHeader
      , PanelFooter
      , Block
      , Heading
      , Text
      , Switch
      , Space
      } = require('rebass')
    , FlexRow = require('../components/FlexRow')
    , { getNode
      , getRootNodePath
      , getLabelResolver
      , isEditingProperties
      } = require('../selectors')
    , {toggleEditingProperties} = require('../actions')
    , ShowNode = require('./ShowNode')
    , Type = require('./Type')
    , Property = require('./Property')
    , AddProperty = require('./AddProperty')
    , {keyFromPath, labelOrID} = require('../utils')

const mapStateToProps = state => (
  { top: getNode(state)
  , path: getRootNodePath(state)
  , labelFor: getLabelResolver(state)
  , isEditingProperties: isEditingProperties(state)
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {toggleEditingProperties}, dispatch)

const renderPath = (top, path, labelFor) => path.reduce(
  ({subpath, elements}, part, index) => (
    { subpath: subpath.push(part)
    , elements: elements.push(
        index % 2 === 0 // alternates between nodes and properties
          ? <ShowNode
              key={`path-${index}`}
              path={subpath}
              deletable={false}
              mr={1}
            />
          : <Text
              key={`path-${index}`}
              mr={1}
            >
              { labelFor(subpath.last()) }
            </Text>
      )
    }
  ),
  {subpath: List(), elements: List()}
)

const EditNode = (
  { top
  , path
  , labelFor
  , isEditingProperties
  , toggleEditingProperties
  }, {rebass}) => {

  const node = top.getIn(path)
  const properties = node.keySeq()
  const {fontSizes} = { ...config, ...rebass }
  return (
    <Panel>
      {
        path.isEmpty()
          ? ''
          : <PanelHeader
              theme={null}
              inverted={false}
              style={{borderBottom: '1px solid', fontWeight: 'inherit'}}
            >
              {renderPath(top, path, labelFor).elements}
            </PanelHeader>
      }
      <Heading>{ labelOrID(node) }</Heading>

      <Block mb={3}>
        <Type path={path.push('@type')} />
        {
          node.propertySeq().map(([predicate, ]) => (
            <Property
              {...keyFromPath(path.push(predicate))}
            />
          ))
        }
        <AddProperty
          {...keyFromPath(path.push(`new-property-${properties.count()}`))}
          exclude={properties}
          style={{fontSize: fontSizes[4]}}
        />
      </Block>
      <PanelFooter>
        <FlexRow margins={{mr: 1}}>
          <Text
            style={{cursor: 'pointer'}}
            onClick={() => toggleEditingProperties()}
          >
            { isEditingProperties? 'Editing properties' : 'Edit properties' }
          </Text>
          <Switch
            checked={isEditingProperties}
            onClick={() => toggleEditingProperties()}
          />
          <Space />
        </FlexRow>
      </PanelFooter>
    </Panel>
  )
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EditNode)

