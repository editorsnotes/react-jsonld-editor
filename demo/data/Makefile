
LOV = http://lov.okfn.org/dataset/lov/vocabs/
CITO = cito/versions/2015-07-03.n3
DCTERMS = dcterms/versions/2012-06-14.n3
FOAF = foaf/versions/2014-01-14.n3
GEO = geo/versions/2009-04-20.n3
GSP = gsp/versions/2012-04-30.n3
OSGEOM = osgeom/versions/2012-10-08.n3
OSSPR = osspr/versions/2013-09-04.n3
OWL = owl/versions/2009-11-15.n3
PLEIADES = pleiades/versions/2016-04-12.ttl
PROV = prov/versions/2015-01-11.n3
RDF = rdf/versions/2014-02-25.n3
RDFS = rdfs/versions/2014-02-25.n3
SKOS = skos/versions/2009-08-18.n3
SPATIAL = spatial/versions/2012-02-05.n3

REMOTE = $(CITO) $(DCTERMS) $(FOAF) $(GEO) $(GSP) $(OSGEOM) $(OSSPR) $(OWL) $(PROV) $(RDF) $(RDFS) $(SKOS) $(SPATIAL)

ALL = $(PLEIADES) $(REMOTE)

all: indexes/classes.json indexes/properties.json indexes/individuals.json

clean:
	rm -rf indexes

vocabs:
	for vocab in $(REMOTE) ; do \
		mkdir -p "vocabs/`dirname $$vocab`" ; \
		wget -O "vocabs/$$vocab" $(LOV)$$vocab ; \
	done

%/classes.json %/properties.json: vocabs
	mkdir -p $* && ./index-vocabularies.py $* $(addprefix vocabs/, $(ALL))

%/individuals.json:
	mkdir -p $* && ./index-datasets.py $* test/pleiades-latest/*.ttl
