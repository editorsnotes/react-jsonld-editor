const React = require('react') // eslint-disable-line no-unused-vars
    , {positionInputCaret} = require('../utils')
    , TextButton = require('./TextButton')

const CancellableInput = (
  {input = '', classes = '', onChange, onAccept, onCancel}) => (
  <div>
    <input
      type="text"
      className={`input mr1 border border-silver ${classes}`}
      value={input}
      ref={positionInputCaret(input.length)}
      onChange={onChange}
      onKeyUp={event => { if (event.key === 'Enter') onAccept() }}
    />
    <TextButton text="Cancel" onClick={onCancel} />
    <TextButton text="Save" onClick={onAccept} />
  </div>
)

CancellableInput.propTypes =
  { input: React.PropTypes.string
  , classes: React.PropTypes.string
  , onChange: React.PropTypes.func.isRequired
  , onAccept: React.PropTypes.func.isRequired
  , onCancel: React.PropTypes.func.isRequired
  }

module.exports = CancellableInput
