module.exports = {

  show: x => console.log(JSON.stringify(x.toJS(), null, '  ')),

  positionInputCaret: pos => input => {
    if (input !== null) {
      input.setSelectionRange(pos, pos)
      input.focus()
    }
  }
}
