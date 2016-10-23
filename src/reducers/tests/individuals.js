const test = require('tape')
    , {Map, List} = require('immutable')
    , reducer = require('../individuals')
    , {UPDATE_UNIVERSE, NEW_NAMED_NODE} = require('../../actions')
    , {node} = require('../../utils')
    , {owl, rdfs} = require('../../namespaces')
    , ns = require('rdf-ns')
    , ex = ns('http://example.org/ns/')

test('default individuals is empty Map', t=> {
  t.plan(1)
  t.ok(reducer(undefined, {})
    .equals(Map()))
})

test('is empty Map after update without individuals', t=> {
  t.plan(1)
  t.ok(reducer(undefined, {type: UPDATE_UNIVERSE})
    .equals(Map()))
})

test('is updated after update with individuals', t=> {
  const Test = node(ex('Test'), 'Test')
  const individuals = Map.of(Test.id, Test)
  t.plan(1)
  t.ok(reducer(undefined, {type: UPDATE_UNIVERSE, individuals})
    .equals(individuals))
})

test('new datatype individuals do not get added', t=> {
  const newProperty = node(ex('a'), 'a')
    .set('@type', List.of(owl('DatatypeProperty')))
  t.plan(1)
  t.false(reducer(Map(), {type: NEW_NAMED_NODE, node: newProperty})
    .has(newProperty.id))
})

test('new object individuals do not get added', t=> {
  const newProperty = node(ex('a'), 'a')
    .set('@type', List.of(owl('ObjectProperty')))
  t.plan(1)
  t.false(reducer(Map(), {type: NEW_NAMED_NODE, node: newProperty})
    .has(newProperty.id))
})

test('new classes do not get added', t=> {
  const newClass = node(ex('a'), 'a')
    .set('@type', List.of(rdfs('Class')))
  t.plan(1)
  t.false(reducer(Map(), {type: NEW_NAMED_NODE, node: newClass})
    .has(newClass.id))
})

test('untyped named nodes do get added', t=> {
  const newNode = node(ex('a'), 'a')
  t.plan(1)
  t.ok(reducer(Map(), {type: NEW_NAMED_NODE, node: newNode})
    .has(newNode.id))
})

test('typed named nodes do get added', t=> {
  const newNode = node(ex('a'), 'a')
    .set('@type', List.of(ex('Foo'), ex('Bar')))
  t.plan(1)
  t.ok(reducer(Map(), {type: NEW_NAMED_NODE, node: newNode})
    .has(newNode.id))
})

test('blank nodes do not get added', t=> {
  const newNode = node(undefined, 'blank')
  t.plan(1)
  t.false(reducer(Map(), {type: NEW_NAMED_NODE, node: newNode})
    .has(undefined))
})
