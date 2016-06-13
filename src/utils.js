const isScrolledIntoView = el => (
  (el.getBoundingClientRect().top >= 0)
    && (el.getBoundingClientRect().bottom <= window.innerHeight)
)

module.exports = {

  show: x => console.log(JSON.stringify(x.toJS(), null, '  ')),

  isScrolledIntoView,

  positionInputCaret: pos => input => {
    if (input !== null) {
      input.setSelectionRange(pos, pos)
      if (isScrolledIntoView(input)) {
        input.focus()
      }
    }
  }
}
