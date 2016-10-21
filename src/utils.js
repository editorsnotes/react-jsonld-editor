const {List} = require('immutable')
    , {JSONLDValue, JSONLDNode} = require('immutable-jsonld')
    , {rdfs} = require('./namespaces')

const isScrolledIntoView = el => (
  (el.getBoundingClientRect().top >= 0)
    && (el.getBoundingClientRect().bottom <= window.innerHeight)
)

const value = v => JSONLDValue({'@value': v})

module.exports = {

  show: x => console.log(JSON.stringify(x.toJS(), null, '  ')),

  isScrolledIntoView,

  positionInputCaret: (pos, focus) => input => {
    if (input !== null) {
      input.setSelectionRange(pos, pos)
      if (focus && isScrolledIntoView(input)) {
        input.focus()
      }
    }
  },

  keyFromPath: path => ({path, key: path.join('|')}),

  labelOrID: node => {
    const label = node.preferredLabel()
    return label ? label.value : node.id || ''
  },

  ignoreDispatch: () => ({}),

  keepOnlyStateProps: p => p,

  value,

  node: (id, label) => {
    const n = JSONLDNode({'@id': id})
    return label
      ? n.set(rdfs('label'), List.of(value(label)))
      : n
  }
}
