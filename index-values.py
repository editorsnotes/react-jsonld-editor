#! /usr/bin/env python3

import os
import sys
import json
import rdflib
from rdflib.namespace import RDF, RDFS, OWL
from rdflib.collection import Collection


class SetDecoder(json.JSONDecoder):
    def __init__(self, **kwargs):
        json.JSONDecoder.__init__(self, **kwargs)
        # Use the custom JSONArray
        self.parse_array = self.JSONArray
        # Use the python implemenation of the scanner
        self.scan_once = json.scanner.py_make_scanner(self)

    def JSONArray(self, s_and_end, scan_once, **kwargs):
        values, end = json.decoder.JSONArray(s_and_end, scan_once, **kwargs)
        return set(values), end


class SetEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, set):
            return list(o)
        return json.JSONEncoder.default(self, o)


_, custompath, outpath, uri, predicate = sys.argv

predicate = RDF.type if predicate == 'type' else RDFS[predicate]


def load(path):
    if not os.path.exists(path):
        return {}
    with open(path) as f:
        return json.load(f, cls=SetDecoder)


custom = load(custompath)
output = load(outpath)

g = rdflib.Graph()
g.parse(uri, format='n3')


def resolveBlankNode(o):
    objects = set()
    for c in g.objects(subject=o, predicate=OWL.unionOf):
        objects = objects.union({str(term) for term in Collection(g, c)})
    return objects

for s, p, o in g.triples((None, predicate, None)):
    if isinstance(s, rdflib.BNode):
        continue
    if isinstance(o, rdflib.Literal) and o.language and not o.language == 'en':
        continue

    if str(s) not in output:
        output[str(s)] = set()

    if isinstance(o, rdflib.Literal):
        output[str(s)].add(o.value)
    elif isinstance(o, rdflib.BNode):
        output[str(s)] = output[str(s)].union(resolveBlankNode(o))
    else:
        output[str(s)].add(str(o))

with open(outpath, 'w') as f:
    json.dump(
        {**output, **custom}, f, sort_keys=True, indent=2, cls=SetEncoder)
