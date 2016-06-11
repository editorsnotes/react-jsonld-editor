const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , ShowIdentifier = require('./ShowIdentifier')
    , Property = require('./Property')
    , DeleteButton = require('../components/DeleteButton')
    , TextButton = require('../components/TextButton')
    , {deleteIn, startEditingProperties} = require('../actions')
    , {getEditedNode, isEditingProperties} = require('../selectors')

const Node = (
  {node, path, isEditingProperties, deleteIn, startEditingProperties}
  ) => (
  <div className={
    `border border-silver py1 pl1 ${node.id ? 'pr1' : 'pr3'} relative`}
  >
    {node.id
      ? ( // node is named
          <ShowIdentifier
            path={path.push('@id')}
            disabled={path.isEmpty()}
          />
        )
      : ( // node is blank / anonymous
          <DeleteButton
            classes="absolute top-0 right-0"
            onClick={() => deleteIn(path)}
          />
        )
    }
    <ul className="list-reset">
      <Property label="is a" path={path.push('@type')} />
      {node.propertySeq().map(([predicate, ]) => (
        <Property
          key={predicate}
          path={path.push(predicate)}
        />))
      }
    </ul>
    <div className={isEditingProperties ? 'hidden' : ''}>
      <TextButton
        text={`${node.propertySeq().count() > 0 ? 'Edit' : 'Add'} properties`}
        onClick={() => startEditingProperties(path, node)}
      />
    </div>
  </div>
)

const mapStateToProps = (state, {path}) => (
  { node: getEditedNode(state).getIn(path)
  , path
  , isEditingProperties: isEditingProperties(state)
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {deleteIn, startEditingProperties}, dispatch)

module.exports = connect(mapStateToProps, mapDispatchToProps)(Node)

