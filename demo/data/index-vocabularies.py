#! /usr/bin/env python3

import sys
import os
import rdflib

IS_CLASS = '{ ?id a rdfs:Class } UNION { ?id a owl:Class }'

IS_PROPERTY = '''
{ ?id a rdf:Property }
UNION
{ ?id a owl:ObjectProperty }
UNION
{ ?id a owl:DatatypeProperty }
UNION
{ ?id a owl:AnnotationProperty }
UNION
{ ?id a owl:OntologyProperty }
'''

CONSTRUCTION = '''
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

CONSTRUCT {
    ?id a ?type ;
        rdfs:domain ?domain ;
        rdfs:range ?range ;
        rdfs:label ?label ;
        skos:prefLabel ?prefLabel .
} WHERE {
    FILTER isIRI(?id) .
    %s .
    { ?id rdfs:label ?label } UNION { ?id skos:prefLabel ?prefLabel }
    OPTIONAL { ?id a ?type . FILTER isIRI(?type) }
    OPTIONAL { ?id rdfs:domain ?domain . FILTER isIRI(?domain) }
    OPTIONAL { ?id rdfs:range ?range . FILTER isIRI(?range) }
}
'''


def serialize(g, path):
    with open(path, 'wb') as f:
        f.write(g.serialize(format='json-ld', indent=2))


def filepath(directory, filename):
    return os.path.join(directory, filename) + '.json'

# ------------------------------------------------------------------------------

_, directory, *vocab_paths = sys.argv

g = rdflib.Graph()
for vocab_path in vocab_paths:
    g.parse(vocab_path, format='n3')
g.parse('./local-additions.ttl', format='turtle')

serialize(
    g.query(CONSTRUCTION % IS_CLASS),
    filepath(directory, 'classes'))
serialize(
    g.query(CONSTRUCTION % IS_PROPERTY),
    filepath(directory, 'properties'))
