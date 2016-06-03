const React = require('react') // eslint-disable-line no-unused-vars

const DeleteButton = ({onClick, color = "#fff", size = '25px', style = {}}) => (
  <svg
    style={
      { display: 'inline-block'
      , verticalAlign: 'middle'
      , cursor: 'pointer'
      , ...style
      }
    }
    width={size}
    height={size}
    viewBox="1 1 22 22"
    onClick={onClick}
  >
    <g>
      <path
        fill={color}
        d="M12,2C6.5,2,2,6.5,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M16.9,15.5l-1.4,1.4L12,13.4l-3.5,3.5   l-1.4-1.4l3.5-3.5L7.1,8.5l1.4-1.4l3.5,3.5l3.5-3.5l1.4,1.4L13.4,12L16.9,15.5z"
      />
    </g>
  </svg>
)

DeleteButton.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  color: React.PropTypes.string,
  size: React.PropTypes.string,
  style: React.PropTypes.object
}

module.exports = DeleteButton
