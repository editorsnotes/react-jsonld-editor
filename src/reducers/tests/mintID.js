const test = require('tape')
    , {Set} = require('immutable')
    , reducer = require('../mintID')
    , {UPDATE_MINT_ID} = require('../../actions')
    , {owl, rdfs} = require('../../namespaces')

test('default mintID is a no-op that accepts nothing', t=> {
  t.plan(6)
  const f = reducer(undefined, {})
  t.equal(typeof f, 'function')
  t.false(f.accepts(owl('ObjectProperty')))
  t.false(f.accepts(owl('DatatypeProperty')))
  t.false(f.accepts(rdfs('Class')))
  t.false(f.accepts(rdfs('Resource')))
  t.equal(f(), undefined)
})

test('mintID is updated on UPDATE_MINT_ID', t=> {
  const action = {type: UPDATE_MINT_ID, mintID: () => 'id'}
  t.plan(1)
  t.equal(reducer(undefined, action), action.mintID)
})

test('mintID is not updated otherwise', t=> {
  const action = {mintID: () => 'id'}
  t.plan(1)
  t.notEqual(reducer(undefined, action), action.mintID)
})

test('if not otherwise specified an initial mintID accepts everything', t=> {
  const f = () => 'id'
  t.plan(5)
  t.equal(reducer(f, {}), f)
  t.ok(f.accepts(owl('ObjectProperty')))
  t.ok(f.accepts(owl('DatatypeProperty')))
  t.ok(f.accepts(rdfs('Class')))
  t.ok(f.accepts(rdfs('Resource')))
})

test('if not otherwise specified an updated mintID accepts everything', t=> {
  const f = () => 'id'
  const action = {type: UPDATE_MINT_ID, mintID: f}
  t.plan(5)
  t.equal(reducer(undefined, action), f)
  t.ok(f.accepts(owl('ObjectProperty')))
  t.ok(f.accepts(owl('DatatypeProperty')))
  t.ok(f.accepts(rdfs('Class')))
  t.ok(f.accepts(rdfs('Resource')))
})

test('a supplied mintID can limit what it accepts', t=> {
  const f = () => 'id'
  f.accepts = type => type === owl('DatatypeProperty')
  const action = {type: UPDATE_MINT_ID, mintID: f}
  t.plan(5)
  t.equal(reducer(undefined, action), f)
  t.false(f.accepts(owl('ObjectProperty')))
  t.ok(f.accepts(owl('DatatypeProperty')))
  t.false(f.accepts(rdfs('Class')))
  t.false(f.accepts(rdfs('Resource')))
})
