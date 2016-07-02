const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {JSONLDNode, JSONLDValue} = require('immutable-jsonld')
    , ShowIdentifier = require('./ShowIdentifier')
    , Type = require('./Type')
    , Property = require('./Property')
    , AddSuggestion = require('../components/AddSuggestion')
    , TextButton = require('../components/TextButton')
    , actions = require('../actions')
    , {rdf, rdfs} = require('../namespaces')
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

const appendExistingProperty = (
  {path, change, selectedSuggestion}, {appendProperty}) => {
    appendProperty(path, change, selectedSuggestion.id)
}

const appendNewProperty = (
  {path, change, properties, idMinter, input},
  {updateProperties, appendProperty}) => {
    const id = idMinter()
        , newProperty = JSONLDNode()
      .set('@id', id)
      .push('@type', rdf('Property'))
      .push(rdfs('label'), JSONLDValue({'@value': input}))
    updateProperties(properties.set(id, newProperty))
    appendProperty(path, change, id)
}

const mergeProps = (stateProps, dispatchProps) => (
  { ...stateProps
  , ...dispatchProps
  , onAdd: stateProps.selectedSuggestion.id
      ? () => appendExistingProperty(stateProps, dispatchProps)
      : stateProps.idMinter
          ? () => appendNewProperty(stateProps, dispatchProps)
          : null
  }
)

module.exports = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Node)

