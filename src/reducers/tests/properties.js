const test = require('tape')
    , {Map, List} = require('immutable')
    , reducer = require('../properties')
    , {UPDATE_UNIVERSE, NEW_NAMED_NODE} = require('../../actions')
    , {node} = require('../../utils')
    , {owl, rdfs} = require('../../namespaces')
    , ns = require('rdf-ns')
    , ex = ns('http://example.org/ns/')

test('default properties includes rdfs:label', t=> {
  t.plan(1)
  t.ok(reducer(undefined, {})
    .has(rdfs('label')))
})

test('rdfs:label gets added to initial properties', t=> {
  t.plan(1)
  t.ok(reducer(Map(), {})
    .has(rdfs('label')))
})

test('includes rdfs:label after update without properties', t=> {
  t.plan(1)
  t.ok(reducer(undefined, {type: UPDATE_UNIVERSE})
    .has(rdfs('label')))
})

test('includes rdfs:label after update with properties', t=> {
  t.plan(1)
  t.ok(reducer(undefined, {type: UPDATE_UNIVERSE, properties: Map()})
    .has(rdfs('label')))
})

test('new datatype properties get added', t=> {
  const newProperty = node(ex('a'), 'a')
    .set('@type', List.of(owl('DatatypeProperty')))
  t.plan(1)
  t.ok(reducer(Map(), {type: NEW_NAMED_NODE, node: newProperty})
    .has(newProperty.id))
})

test('new object properties get added', t=> {
  const newProperty = node(ex('a'), 'a')
    .set('@type', List.of(owl('ObjectProperty')))
  t.plan(1)
  t.ok(reducer(Map(), {type: NEW_NAMED_NODE, node: newProperty})
    .has(newProperty.id))
})

test('new classes do not get added', t=> {
  const newClass = node(ex('a'), 'a')
    .set('@type', List.of(rdfs('Class')))
  t.plan(1)
  t.false(reducer(Map(), {type: NEW_NAMED_NODE, node: newClass})
    .has(newClass.id))
})

test('other named nodes do not get added', t=> {
  const newNode = node(ex('a'), 'a')
  t.plan(1)
  t.false(reducer(Map(), {type: NEW_NAMED_NODE, node: newNode})
    .has(newNode.id))
})
