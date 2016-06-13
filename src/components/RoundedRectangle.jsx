const React = require('react') // eslint-disable-line no-unused-vars
    , DeleteButton = require('./DeleteButton')

const RoundedRectangle = (
  {text, classes = '', onClick, onClickDelete}) => (
  <span
    className={`relative inline-block py1 pl2 white bold
 ${classes}
 ${onClick ? 'cursor-pointer' : 'muted'}
 ${onClickDelete ? 'pl2' : 'px2'}`}
    style={
      { borderRadius: '1.5em'
      , minHeight: '1.5em'
      , paddingRight: onClickDelete ? '2.5em' : null
      }
    }
    onClick={onClick}
  >
    <span className="align-middle">{text}</span>
    <DeleteButton
      color="#ffffff"
      classes={`absolute top-0 right-0
 ${onClickDelete ? 'cursor-pointer' : 'hidden'}`}
      onClick={onClickDelete
        ? e => {
            e.stopPropagation()
            onClickDelete()
          }
        : null
      }
    />
  </span>
)

RoundedRectangle.propTypes = {
  text: React.PropTypes.string.isRequired,
  classes: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onClickDelete: React.PropTypes.func
}

module.exports = RoundedRectangle
