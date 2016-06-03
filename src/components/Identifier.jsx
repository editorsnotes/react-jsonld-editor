const React = require('react') // eslint-disable-line no-unused-vars
    , DeleteButton = require('./DeleteButton')

const Identifier = ({id, label = id, onClickDelete}) => (
  id === undefined
    ? <span className="blank-node"></span>
    : (
        <a
          href={id}
          target="_blank"
          style={
            { color: '#fff'
            , backgroundColor: '#0b48aa'
            , textDecoration: 'none'
            , fontWeight: 'bold'
            , borderRadius: '1.5em'
            , display: 'inline-block'
            , padding: '0.4em 0.6em'
            }
          }
        >
          <span style={{marginRight: '0.4em'}}>{label}</span>
          {onClickDelete
            ? (
                <DeleteButton
                  size="20px"
                  onClick={e => {
                    e.preventDefault()
                    onClickDelete()
                  }}
                />
              )
            : null
          }
        </a>
      )
)

Identifier.propTypes = {
  id: React.PropTypes.string,
  label: React.PropTypes.string,
  onClickDelete: React.PropTypes.func
}

module.exports = Identifier
