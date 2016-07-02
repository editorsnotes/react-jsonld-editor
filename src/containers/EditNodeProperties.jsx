const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , ShowIdentifier = require('./ShowIdentifier')
    , Type = require('./Type')
    , Property = require('./Property')
    , AddSuggestion = require('../components/AddSuggestion')
    , TextButton = require('../components/TextButton')
    , actions = require('../actions')
    , {rdf} = require('../namespaces')
    , {makeNode} = require('../utils')
    , { getEditedNode
      , getChange
      , getInput
      , getPropertySuggestions
      , getSelectedSuggestion
      , getIdMinter
      , getProperties
      } = require('../selectors')

const Node = (
  { node, change, input, suggestions, path, updateInput
  , updateSelectedSuggestion, acceptChange, cancelChange, onAdd
  } ) => (
  <div className={
    `border border-silver py1 pl1 ${node.id ? 'pr1' : 'pr3'} relative`}
  >
    {node.id
      ? ( // node is named
          <ShowIdentifier
            path={path.push('@id')}
            deletable={false}
          />
        )
      : null
    }
    <ul className="list-reset">
      <Type path={path.push('@type')} />
      {node.propertySeq().map(([predicate, ]) => (
        <Property
          key={predicate}
          path={path.push(predicate)}
        />))
      }
      <li className="mb1 relative">
        <AddSuggestion
          input={input}
          autofocus={true}
          suggestions={suggestions}
          onChange={e => updateInput(e.target.value)}
          onSuggestionSelected={
            (_, {suggestion}) => updateSelectedSuggestion(suggestion)
          }
          onAdd={onAdd}
        />
      </li>
    </ul>
    <div>
      <TextButton
        text="Cancel"
        onClick={() => cancelChange()} />
      <TextButton
        text="Save"
        onClick={() => acceptChange(path, change)} />
    </div>
  </div>
)

const mapStateToProps = (state, {path}) => {
  return (
    { node: getEditedNode(state).getIn(path)
    , change: getChange(state)
    , input: getInput(state)
    , properties: getProperties(state)
    , suggestions: getPropertySuggestions(state)
    , selectedSuggestion: getSelectedSuggestion(state)
    , idMinter: getIdMinter(state)
    , path
    }
  )
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

const addNewProperty = (id, label, properties, updateProperties) => {
  updateProperties(properties.set(id, makeNode(id, label, rdf('Property'))))
  return id
}

const mergeProps = (
  { node, change, input, properties, suggestions, selectedSuggestion
  , idMinter },
  { updateInput, updateSelectedSuggestion, updateProperties, acceptChange
  , cancelChange, appendProperty },
  { path }) => (
  { node, change, input, suggestions, path
  , updateInput, updateSelectedSuggestion, acceptChange, cancelChange
  , onAdd: selectedSuggestion.id
      ? () => appendProperty(path, change, selectedSuggestion.id)
      : idMinter
          ? () => appendProperty(path, change, addNewProperty(
              idMinter(), input, properties, updateProperties))
          : null
  }
)

module.exports = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Node)

