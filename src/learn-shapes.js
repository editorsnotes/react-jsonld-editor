#!/usr/bin/env node

'use strict'

const N3 = require('n3')
    , fs = require('fs')
    , {Map, List, Set} = require('immutable')
    , {RDF} = require('./namespaces')

let shapes = Map()

function ShapeLearner() {
  const writer = new require('stream').Writable({objectMode: true})
  let subject, types = Set()
  writer._write = function (triple, _, done) {
    if (triple.subject != subject) {
      subject = triple.subject
      types = types.clear()
    }
    if (triple.predicate == RDF.type) {
      types = types.add(triple.object)
    } else {
      types.forEach(type => {
        shapes = shapes.update(
          type, Map(), m => m.update(triple.predicate, 0, c => c+1))
      })
    }
    done()
  }
  return writer
}

let promises = List(process.argv).skip(2).map(filename => new Promise(
  (resolve, reject) => {
    const streamParser = N3.StreamParser()
        , learner = new ShapeLearner()
    learner.on('finish', () => resolve())
    streamParser.on('error', err => reject(`${filename}: ${err}`))
    streamParser.pipe(learner)
    fs.createReadStream(filename).pipe(streamParser)
  }
))

Promise.all(promises)
  .then(() => process.stdout.write(JSON.stringify(shapes.toJS())))
  .catch(console.error)
