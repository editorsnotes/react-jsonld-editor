

LOV = http://lov.okfn.org/dataset/lov/vocabs/
CITO = "$(LOV)cito/versions/2015-07-03.n3"
DCTERMS = "$(LOV)dcterms/versions/2012-06-14.n3"
FOAF = "$(LOV)foaf/versions/2014-01-14.n3"
GEO = "$(LOV)geo/versions/2009-04-20.n3"
OSGEOM = "$(LOV)osgeom/versions/2012-10-08.n3"
OSSPR = "$(LOV)osspr/versions/2013-09-04.n3"
OWL = "$(LOV)owl/versions/2009-11-15.n3"
PLEIADES = "file:///Users/ryanshaw/Code/react-jsonld-editor/data/pleiades-vocab.ttl"
PROV = "$(LOV)prov/versions/2015-01-11.n3"
RDF = "$(LOV)rdf/versions/2014-02-25.n3"
RDFS = "$(LOV)rdfs/versions/2014-02-25.n3"
SKOS = "$(LOV)skos/versions/2009-08-18.n3"
SPATIAL = "$(LOV)spatial/versions/2012-02-05.n3"
ALL = $(CITO) $(DCTERMS) $(FOAF) $(GEO) $(OSGEOM) $(OSSPR) $(OWL) $(PLEIADES) $(PROV) $(RDF) $(RDFS) $(SKOS) $(SPATIAL)

indexfiles = labels.json ranges.json types.json

all: indexes

shapes.json:
	node --max-old-space-size=5000 \
		../lib/learn-shapes.js pleiades-latest/*.ttl > shapes.json

clean:
	rm -f $(indexfiles)

indexes: $(indexfiles)

%.json: custom/%.json
	for vocab in $(ALL) ; do \
		../index-values.py $< $@ $$vocab $(subst s.json, ,$@) ; \
	done

