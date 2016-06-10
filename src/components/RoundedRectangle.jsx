const React = require('react') // eslint-disable-line no-unused-vars

const RoundedRectangle = ({text, classes = '', onClick}) => (
  <span
    className={
      `relative inline-block py1 px2 white bold cursor-pointer
 ${classes}
`}
    style={{borderRadius: '1.5em', minHeight: '1.5em'}}
    onClick={onClick}
  >
    <span className="align-middle">{text}</span>
  </span>
)

RoundedRectangle.propTypes = {
  text: React.PropTypes.string.isRequired,
  classes: React.PropTypes.string,
  onClick: React.PropTypes.func,
}

module.exports = RoundedRectangle
