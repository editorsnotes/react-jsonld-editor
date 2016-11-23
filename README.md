## React JSON-LD Editor

The `Editor` is a component providing a UI for editing a [JSON-LD node object](http://www.w3.org/TR/2014/REC-json-ld-20140116/#node-objects). It relies on [`immutable-jsonld`](https://www.npmjs.com/package/immutable-jsonld).

Simplest possible use:

```javascript
const Editor = require('react-jsonld-editor')

const render = props => (
  <Editor />
)
```

The simplest possible use is not very useful; it will display an empty JSON-LD node, and there will be no way to modify it.

To make it more useful specify some props:

* The `node` prop is a JSON-LD node object to begin editing; it should be an instance of `JSONLDNode` (from [`immutable-jsonld`](https://www.npmjs.com/package/immutable-jsonld).
* The `classes` and `properties` props specify the vocabularies to use. Each of these should be an [Immutable](https://facebook.github.io/immutable-js/) `Map` with URIs (as strings) for keys and `JSONLDNode`s for values. The `JSONLDNode`s should have `rdfs:label`s or `skos:prefLabel`s. The `JSONLDNode`s in the `properties` `Map` may also have `rdfs:range`s. See [edit-with-lov](https://github.com/editorsnotes/edit-with-lov/blob/master/src/lovutils.js) for an example of how one might create these `Map`s from a stream of triples.
* Similarly, the `individuals` prop specifies individual resources that can serve as the objects of properties. It should also be an [Immutable](https://facebook.github.io/immutable-js/) `Map` with URIs (as strings) for keys and `JSONLDNode`s for values. The `JSONLDNode`s should have `rdfs:label`s or `skos:prefLabel`s.
* Finally, you can be notified of changes to the JSON-LD node by providing a callback function as the `onSave` prop.

Try the [demo](http://editorsnotes.github.io/react-jsonld-editor/demo/standalone/) of editing a record from [the Pleiades gazetteer](https://pleiades.stoa.org), or check out its [source](https://github.com/editorsnotes/react-jsonld-editor/blob/master/demo/src/index.js). (Note that this demo is rather slow to load because it is loading quite a bit of JSON data into memory on load.)

<!--
For an example of using the editor with dynamically loaded vocabuaries from [Linked Open Vocabularies](http://lov.okfn.org/dataset/lov/), see `edit-with-lov` ([demo](https://editorsnotes.github.io/edit-with-lov/), [source](https://github.com/editorsnotes/edit-with-lov)).
-->
