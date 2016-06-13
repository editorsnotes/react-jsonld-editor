const React = require('react') // eslint-disable-line no-unused-vars

const TextButton = ({text, onClick}) => (
  <span
    className={`p1 cursor-pointer ${onClick ? 'blue' : 'silver'}`}
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
