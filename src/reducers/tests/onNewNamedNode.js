const test = require('tape')
    , reducer = require('../onNewNamedNode')
    , { NEW_NAMED_NODE
      , UPDATE_ON_NEW_NAMED_NODE
      } = require('../../actions')
    , {node} = require('../../utils')
    , ns = require('rdf-ns')
    , ex = ns('http://example.org/ns/')

test('default onNewNamedNode is a function', t=> {
  t.plan(1)
  t.equal(typeof reducer(undefined, {}), 'function')
})

test('onNewNamedNode is updated on UPDATE_ON_NEW_NAMED_NODE', t=> {
  const f = () => {}
  const action = {type: UPDATE_ON_NEW_NAMED_NODE, onNewNamedNode: f}
  t.plan(1)
  t.equal(reducer(undefined, action), f)
})

test('cannot set onNewNamedNode to undefined', t=> {
  const action = {type: UPDATE_ON_NEW_NAMED_NODE}
  t.plan(1)
  t.equal(typeof reducer(undefined, action), 'function')
})

test('onNewNamedNode is not updated otherwise', t=> {
  const f = () => {}
  const action = {onNewNamedNode: f}
  t.plan(1)
  t.notEqual(reducer(undefined, action), f)
})

test('onNewNamedNode is called on NEW_NAMED_NODE', t=> {
  const action = {type: NEW_NAMED_NODE, node: node(ex('test'), 'test')}
  const f = node => {
    t.equal(node, action.node)
    t.end()
  }
  reducer(f, action)
})

test('onNewNamedNode is not called otherwise', t=> {
  reducer(() => t.fail('should not have been called'), {})
  t.end()
})
