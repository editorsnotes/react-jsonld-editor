const React = require('react') // eslint-disable-line no-unused-vars
    , DeleteButton = require('./DeleteButton')

const DeletableRoundedRectangle = (
  {text, classes = '', onClick, onClickDelete}) => (
  <span
    className={`relative inline-block py1 pl2 white bold cursor-pointer ${classes}`}
    style={{borderRadius: '1.5em', minHeight: '1.5em', paddingRight: '2.5em'}}
    onClick={onClick}
  >
    <span className="align-middle">{text}</span>
    <DeleteButton
      color="#ffffff"
      classes="absolute top-0 right-0"
      onClick={e => {
        e.stopPropagation()
        onClickDelete()
      }}
    />
  </span>
)

DeletableRoundedRectangle.propTypes = {
  text: React.PropTypes.string.isRequired,
  classes: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onClickDelete: React.PropTypes.func
}

module.exports = DeletableRoundedRectangle
