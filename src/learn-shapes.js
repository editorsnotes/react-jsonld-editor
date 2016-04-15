#!/usr/bin/env node

'use strict'

const N3 = require('n3')
    , fs = require('fs')
    , {Map, List} = require('immutable')
    , {RDF} = require('./namespaces')

let shapes = Map()

function ShapeLearner() {
  const writer = new require('stream').Writable({objectMode: true})
  let subject, type
  writer._write = function (triple, _, done) {
    if (triple.predicate == RDF.type) {
      subject = triple.subject
      type = triple.object
    } else if (triple.subject == subject) {
      if (type !== undefined) {
        shapes = shapes.update(
          type, Map(), m => m.update(triple.predicate, 0, c => c+1))
      }
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
