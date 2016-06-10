const React = require('react') // eslint-disable-line no-unused-vars
    , RoundedRectangle = require('./RoundedRectangle')
    , DeletableRoundedRectangle = require('./DeletableRoundedRectangle')

const Identifier = ({id, label = id, onClick, onClickDelete}) => (
  id === undefined
    ? <span className="blank-node"></span>
    : onClickDelete
        ? <DeletableRoundedRectangle
            text={label}
            classes={`bg-blue ${onClick ? '' : 'muted'}`}
            onClick={onClick}
            onClickDelete={onClickDelete}
          />
        : <RoundedRectangle
            text={label}
            classes={`bg-blue ${onClick ? '' : 'muted'}`}
            onClick={() => window.open(id, '_blank')}
        />
)

Identifier.propTypes = {
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  onClickDelete: React.PropTypes.func
}

module.exports = Identifier
