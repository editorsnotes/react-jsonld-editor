const test = require('tape')
    , {Map} = require('immutable')
    , reducer = require('../properties')
    , {UPDATE_UNIVERSE} = require('../../actions')
    , {rdfs} = require('../../namespaces')

test('default properties includes rdfs:label', t=> {
  t.plan(1)
  t.ok(reducer(undefined, {})
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

