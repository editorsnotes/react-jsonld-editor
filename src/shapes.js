'use strict'

const {Map} = require('immutable')
    , {fromExpandedJSONLD, JSONLDNode} = require('immutable-jsonld')
    , {SH} = require('./namespaces')

const predicatesOf = node => {
  // Return a sequence of the predicates used in this node.
  return node.propertySeq().map(
    ([predicate, ]) => JSONLDNode({'@id': predicate}))
}

const propertiesOf = node => {
  // Return a seq of SHACL property constraints reflecting the node's structure.
  return predicatesOf(node).map(
    predicate => JSONLDNode({[SH.predicate]: predicate}))
}

const addPropertiesToShape = (shape, newProperties) => {
  let properties = shape.getAt([SH.property]).union(newProperties)
  return properties.isEmpty() ? shape
    : shape.set(SH.property, properties.toList())
}

const EMPTY_SHAPE = fromExpandedJSONLD({[SH.property]: []}).first()

module.exports = function (nodes, shapes=Map()) {
  return nodes
    .flatMap(node => node.descendantNodes())
    .reduce((shapes, [path, node]) => {
      let properties = propertiesOf(node)
      if (! properties.isEmpty()) {
        // update shapes for types of this node
        shapes = shapes.merge(node.types
          .map(type => [type, shapes.get(type, EMPTY_SHAPE)])
          .map(([type, shape]) =>
               [type, addPropertiesToShape(shape, properties)]))

        if (! path.isEmpty()) {
          // update shape for predicate pointing to this node
          let predicate = path.last()
            , shape = shapes.get(predicate, EMPTY_SHAPE)
          shapes = shapes.set(
            predicate, addPropertiesToShape(shape, properties))
        }
      }
      return shapes
    }, shapes)
}
