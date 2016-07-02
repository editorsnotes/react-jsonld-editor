const {JSONLDNode, JSONLDValue} = require('immutable-jsonld')
    , {rdfs} = require('./namespaces')

const isScrolledIntoView = el => (
  (el.getBoundingClientRect().top >= 0)
    && (el.getBoundingClientRect().bottom <= window.innerHeight)
)

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

  makeNode: (id, label, type) => JSONLDNode()
    .set('@id', id)
    .push('@type', type)
    .push(rdfs('label'), JSONLDValue({'@value': label}))
}
