module.exports = {
  RDF: {
    type: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
    Property: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property'
  },
  RDFS: {
    Class: 'http://www.w3.org/2000/01/rdf-schema#Class',
    Datatype: 'http://www.w3.org/2000/01/rdf-schema#Datatype',
    Literal: 'http://www.w3.org/2000/01/rdf-schema#Literal',
    label: 'http://www.w3.org/2000/01/rdf-schema#label'
  },
  OWL: {
    Class: 'http://www.w3.org/2002/07/owl#Class',
    AnnotationProperty: 'http://www.w3.org/2002/07/owl#AnnotationProperty',
    DatatypeProperty: 'http://www.w3.org/2002/07/owl#DatatypeProperty',
    ObjectProperty: 'http://www.w3.org/2002/07/owl#ObjectProperty',
    OntologyProperty: 'http://www.w3.org/2002/07/owl#OntologyProperty',
  },
  SH: {
    property: 'http://www.w3.org/ns/shacl#property',
    predicate: 'http://www.w3.org/ns/shacl#predicate'
  },
  XSD: {
    anyAtomicType: 'http://www.w3.org/2001/XMLSchema#anyAtomicType',
    string: 'http://www.w3.org/2001/XMLSchema#string',
    dateTime: 'http://www.w3.org/2001/XMLSchema#dateTime',
    gYear: 'http://www.w3.org/2001/XMLSchema#gYear',
    float: 'http://www.w3.org/2001/XMLSchema#float',
    integer: 'http://www.w3.org/2001/XMLSchema#integer'
  },
  SKOS: {
    prefLabel: "http://www.w3.org/2004/02/skos/core#prefLabel"
  }
}
