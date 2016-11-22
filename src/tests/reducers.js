const test = require('tape')
    , {List} = require('immutable')
    , {JSONLDNode} = require('immutable-jsonld')
    , {updateNode, pushIn} = require('../actions')

test('node reducer on updateNode', t => {
  const reducer = require('../reducers/node')
  t.plan(1)

  const node = JSONLDNode().set('@id', 'foo')
  t.ok(
    reducer(
      undefined,
      updateNode(node)
    )
    .equals(node)
  )
})

test('node reducer on pushIn', t => {
  const reducer = require('../reducers/node')
  t.plan(2)

  t.ok(
    reducer(
      undefined,
      pushIn(List.of('@type'), 'thing')
    )
    .get('@type').equals(List.of('thing'))
  )

  const path = List.of('a', 0, '@type')
  t.ok(
    reducer(
      JSONLDNode().push('a', JSONLDNode()),
      pushIn(path, 'thing')
    )
    .getIn(path).equals(List.of('thing'))
  )
})

test('editPath reducer on pushIn', t => {
  const reducer = require('../reducers/editPath')
  t.plan(1)

  t.ok(
    reducer(
      undefined,
      pushIn(List.of('@type'), 'thing', {editPath: List.of('foo', 'bar')})
    )
    .equals(List.of('foo', 'bar'))
  )
})

test('input reducer on pushIn', t => {
  const reducer = require('../reducers/input')
  t.plan(1)

  t.equal(
    reducer(
      'blah',
      pushIn(List.of('@type'), 'thing')
    ),
    ''
  )
})
