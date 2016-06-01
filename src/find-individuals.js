#!/usr/bin/env node

'use strict'

const N3 = require('n3')
    , fs = require('fs')
    , {Map, List, Set} = require('immutable')
    , {RDF, RDFS, OWL, SKOS} = require('./namespaces')

const excluded = Set(
  [ OWL.Class
  , RDFS.Class
  , RDFS.Datatype
  , RDF.Property
  , OWL.ObjectProperty
  , OWL.DatatypeProperty
  , OWL.AnnotationProperty
  , OWL.OntologyProperty
  ]
)

let individuals = Map()

function IndividualFinder() {
  const writer = new require('stream').Writable({objectMode: true})
  let subject, types = Set()
  writer._write = function (triple, _, done) {
    if (! N3.Util.isBlank(triple.subject)) {
      if (triple.subject != subject) {
        subject = triple.subject
        types = types.clear()
      }
      if (triple.predicate == RDF.type) {
        types = types.add(triple.object)
      } else if (
        (triple.predicate == RDFS.label || triple.predicate == SKOS.prefLabel)
          &&
          (types.intersect(excluded).count() == 0)
      ) {
        let value = N3.Util.getLiteralValue(triple.object)
        let language = N3.Util.getLiteralLanguage(triple.object)
        individuals = individuals.update(
          triple.subject, Map(), m => m.update(
            'labels', List(), l => l.push(List([value, language || null]))))
      }
    }
    done()
  }
  return writer
}

let promises = List(process.argv).skip(2).map(filename => new Promise(
  (resolve, reject) => {
    const streamParser = N3.StreamParser()
        , learner = new IndividualFinder()
    learner.on('finish', () => resolve())
    streamParser.on('error', err => reject(`${filename}: ${err}`))
    streamParser.pipe(learner)
    fs.createReadStream(filename).pipe(streamParser)
  }
))

Promise.all(promises)
  .then(() => process.stdout.write(JSON.stringify(individuals.toJS())))
  .catch(console.error)
