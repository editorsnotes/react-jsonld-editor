const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {List} = require('immutable')
    , {Text} = require('rebass')
    , {getNode} = require('../selectors')
    , {keyFromPath} = require('../utils')
    , FlexRow = require('../components/FlexRow')
    , ShowIdentifier = require('../containers/ShowIdentifier')
    , AddTypeIdentifier = require('../containers/AddTypeIdentifier')

const mapStateToProps = (state, {path}) => {
  const ids = getNode(state).getIn(path, List())
  return {
    children:
      [ <Text>is a</Text>

      , ids.map((o, i) => <ShowIdentifier {...keyFromPath(path.push(i))} />)

      , <AddTypeIdentifier {...keyFromPath(path.push(ids.count()))} />
      ]
  }
}

module.exports = connect(mapStateToProps)(FlexRow)
