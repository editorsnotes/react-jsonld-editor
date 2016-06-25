const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , ShowIdentifier = require('./ShowIdentifier')
    , Type = require('./Type')
    , Property = require('./Property')
    , AddSuggestion = require('../components/AddSuggestion')
    , TextButton = require('../components/TextButton')
    , actions = require('../actions')
    , { getEditedNode
      , getChange
      , getInput
      , getPropertySuggestions
      , getSelectedSuggestion
      } = require('../selectors')

const Node = (
  { node, change, input, suggestions, selectedSuggestion, path , updateInput
  , updateSelectedSuggestion, appendProperty, acceptChange, cancelChange
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
          onAdd={selectedSuggestion.id
            ? () => appendProperty(path, change, selectedSuggestion.id)
            : null
          }
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

const mapStateToProps = (state, {path}) => (
  { node: getEditedNode(state).getIn(path)
  , change: getChange(state)
  , input: getInput(state)
  , suggestions: getPropertySuggestions(state)
  , selectedSuggestion: getSelectedSuggestion(state)
  , path
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

module.exports = connect(mapStateToProps, mapDispatchToProps)(Node)

