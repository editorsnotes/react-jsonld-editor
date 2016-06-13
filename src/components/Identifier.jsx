const React = require('react') // eslint-disable-line no-unused-vars
    , RoundedRectangle = require('./RoundedRectangle')

const Identifier = ({id, label = id, onClick, onClickDelete}) => (
  id === undefined
    ? <span className="blank-node"></span>
    : <RoundedRectangle
        text={label}
        classes="bg-blue"
        onClick={onClick}
        onClickDelete={onClickDelete}
      />
)

Identifier.propTypes = {
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  onClickDelete: React.PropTypes.func
}

module.exports = Identifier
