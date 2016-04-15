'use strict'

const test = require('tape')
    , Immutable = require('immutable')
    , {fromJSONLD, fromExpandedJSONLD} = require('immutable-jsonld')
    , learnShapes = require('../shapes.js')
    , data = require('../../data')
    //, {show} = require('../utils.js')
    //, diff = require('immutablediff')

Promise.all(data.map(fromJSONLD))
  .then(nodeLists => {
//------------------------------------------------------------------------------

const nodes = Immutable.List(nodeLists).flatten(true)
    , expectedShapes = require('../../data/expected-shapes.json')

test('test learnShapes()', t => {
  t.plan(1)
  let actual = learnShapes(nodes)
    , expected = Immutable.fromJS(expectedShapes)
        .map(shape => fromExpandedJSONLD(shape).first())
  t.ok(actual.equals(expected), 'learned expected shapes')
  //show(diff(expected, actual))
})

//------------------------------------------------------------------------------
})
.catch(err => console.log(err))
