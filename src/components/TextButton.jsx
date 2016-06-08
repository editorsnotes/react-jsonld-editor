const React = require('react') // eslint-disable-line no-unused-vars

const TextButton = ({text, onClick}) => (
  <span
    className="blue p1 cursor-pointer"
    onClick={onClick}
  >
    {text}
  </span>
)

TextButton.propTypes =
  { text: React.PropTypes.string.isRequired
  , onClick: React.PropTypes.func.isRequired
  }

module.exports = TextButton
