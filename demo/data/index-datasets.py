#! /usr/bin/env python3

import sys
import os
import rdflib

CONSTRUCTION = '''
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

CONSTRUCT {
    ?id a ?type ;
        rdfs:label ?label ;
        skos:prefLabel ?prefLabel .
} WHERE {
    FILTER isIRI(?id) .
    { ?id rdfs:label ?label }
        UNION { ?id skos:prefLabel ?prefLabel }
        OPTIONAL { ?id a ?type . FILTER isIRI(?type) } .
    MINUS { ?id a rdfs:Class } .
    MINUS { ?id a owl:Class } .
    MINUS { ?id a rdf:Property } .
    MINUS { ?id a owl:ObjectProperty } .
    MINUS { ?id a owl:DatatypeProperty } .
    MINUS { ?id a owl:AnnotationProperty } .
    MINUS { ?id a owl:OntologyProperty }
}
'''


def serialize(g, path):
    with open(path, 'wb') as f:
        f.write(g.serialize(format='json-ld', indent=2))


def filepath(directory, filename):
    return os.path.join(directory, filename) + '.json'

# ------------------------------------------------------------------------------

_, directory, *dataset_paths = sys.argv

g = rdflib.Graph()
for dataset_path in dataset_paths:
    g.parse(dataset_path, format='turtle')

serialize(
    g.query(CONSTRUCTION),
    filepath(directory, 'individuals'))
