const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {List, Set} = require('immutable')
    , {Text, Space} = require('rebass')
    , {getNode, getClasses, getIDMinter} = require('../selectors')
    , {keyFromPath, ignoreDispatch, keepOnlyStateProps} = require('../utils')
    , FlexRow = require('../components/FlexRow')
    , ShowIdentifier = require('./ShowIdentifier')
    , AddTypeIdentifier = require('./AddTypeIdentifier')
    , {rdfs} = require('../namespaces')

const mapStateToProps = (state, {path}) => {
  const ids = getNode(state).getIn(path, List())
  const canAddTypeIdentifier = (
    getIDMinter(state).accepts(rdfs('Class')) ||
    (! Set(getClasses(state).keySeq()).subtract(ids).isEmpty())
  )
  return (
    { children:
      [ <Text>is a</Text>

      , ids.isEmpty()
          ? null
          : ids.map((o, i) => <ShowIdentifier {...keyFromPath(path.push(i))} />)

      , canAddTypeIdentifier
          ? <AddTypeIdentifier
              {...keyFromPath(path.push(ids.count()))}
              exclude={ids}
            />
          : <Space/>
      ]
    }
  )
}

const Type = connect(
  mapStateToProps, ignoreDispatch, keepOnlyStateProps)(FlexRow)

Type.displayName = 'Type'

module.exports = Type
