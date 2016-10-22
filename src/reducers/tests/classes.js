const test = require('tape')
    , {Map, List} = require('immutable')
    , reducer = require('../classes')
    , {UPDATE_UNIVERSE, NEW_NAMED_NODE} = require('../../actions')
    , {node} = require('../../utils')
    , {owl, rdfs} = require('../../namespaces')
    , ns = require('rdf-ns')
    , ex = ns('http://example.org/ns/')

test('default classes is empty Map', t=> {
  t.plan(1)
  t.ok(reducer(undefined, {})
    .equals(Map()))
})

test('is empty Map after update without classes', t=> {
  t.plan(1)
  t.ok(reducer(undefined, {type: UPDATE_UNIVERSE})
    .equals(Map()))
})

test('is updated after update with classes', t=> {
  const Test = node(ex('Test'), 'Test')
  const classes = Map.of(Test.id, Test)
  t.plan(1)
  t.ok(reducer(undefined, {type: UPDATE_UNIVERSE, classes})
    .equals(classes))
})

test('new datatype classes do not get added', t=> {
  const newProperty = node(ex('a'), 'a')
    .set('@type', List.of(owl('DatatypeProperty')))
  t.plan(1)
  t.false(reducer(Map(), {type: NEW_NAMED_NODE, node: newProperty})
    .has(newProperty.id))
})

test('new object classes do not get added', t=> {
  const newProperty = node(ex('a'), 'a')
    .set('@type', List.of(owl('ObjectProperty')))
  t.plan(1)
  t.false(reducer(Map(), {type: NEW_NAMED_NODE, node: newProperty})
    .has(newProperty.id))
})

test('new classes get added', t=> {
  const newClass = node(ex('a'), 'a')
    .set('@type', List.of(rdfs('Class')))
  t.plan(1)
  t.ok(reducer(Map(), {type: NEW_NAMED_NODE, node: newClass})
    .has(newClass.id))
})

test('other named nodes do not get added', t=> {
  const newNode = node(ex('a'), 'a')
  t.plan(1)
  t.false(reducer(Map(), {type: NEW_NAMED_NODE, node: newNode})
    .has(newNode.id))
})
