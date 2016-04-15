"use strict"

var {List} = require('immutable')

module.exports = {
  show: x => console.log(JSON.stringify(x.toJS(), null, '  ')),
  labelFor: (labels, x) =>
    x === '@type' ? 'is a' : labels.get(x, List.of('MISSING LABEL')).first()
}
