#! /usr/bin/env python3

import os
import sys
import json
import rdflib
from rdflib.namespace import RDF, RDFS, OWL
from rdflib.collection import Collection


def load(path):
    if not os.path.exists(path):
        return {}
    with open(path) as f:
        return json.load(f)


def isClass(o):
    return o in (OWL.Class, RDFS.Class, RDFS.Datatype)


def isProperty(o):
    return o in (OWL.ObjectProperty, RDF.Property, OWL.DatatypeProperty,
                 OWL.AnnotationProperty, OWL.OntologyProperty)


def isDatatypeProperty(o):
    return o == OWL.DatatypeProperty


def filepath(path, part):
    return os.path.join(path, part) + '.json'

# ------------------------------------------------------------------------------

_, custompath, outpath, vocab_uri = sys.argv


g = rdflib.Graph()
g.parse(vocab_uri, format='n3')


def resolveBlankNode(o):
    objects = set()
    for c in g.objects(subject=o, predicate=OWL.unionOf):
        objects = objects.union({str(term) for term in Collection(g, c)})
    return objects

custom = {}
output = {}

for part in ['classes', 'properties', 'datatype-properties']:
    custom[part] = load(filepath(custompath, part))
    output[part] = load(filepath(outpath, part))


def contains(labels, label):
    return any([(l[0] == label[0] and l[1] == label[1]) for l in labels])


def addLabels(part, s, labels):
    o = output[part].setdefault(str(s), {})
    existing = o.setdefault('labels', list())
    existing.extend(
        [l for l in labels if not contains(existing, l)])


def addRange(part, s, clazz):
    o = output[part].setdefault(str(s), {})
    existing = o.setdefault('ranges', list())
    if str(clazz) not in existing:
        existing.append(str(clazz))

for s, p, o in g.triples((None, RDF.type, None)):

    if isinstance(s, rdflib.BNode):
        continue

    labels = [(label.value, label.language)
              for prop, label in g.preferredLabel(s)]

    if len(labels) == 0:
        continue

    if isClass(o):
        addLabels('classes', s, labels)
    if isProperty(o):
        addLabels('properties', s, labels)
    if isDatatypeProperty(o):
        addLabels('datatype-properties', s, labels)

for s, p, o in g.triples((None, RDFS.range, None)):
    key = str(s)
    if key in output['properties']:
        addRange('properties', s, o)
    if key in output['datatype-properties']:
        addRange('datatype-properties', s, o)

os.makedirs(outpath, exist_ok=True)

for part in ['classes', 'properties', 'datatype-properties']:
    o = {}
    for k in (set(output[part].keys()) | set(custom[part].keys())):
        o[k] = {**(output[part].get(k, {})), **(custom[part].get(k, {}))}
    with open(filepath(outpath, part), 'w') as f:
        json.dump(o, f, sort_keys=True, indent=2)
