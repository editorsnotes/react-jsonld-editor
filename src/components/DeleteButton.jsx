const React = require('react') // eslint-disable-line no-unused-vars

const DeleteButton = ({onClick, color='#AAAAAA', classes = ''}) => (
  <svg
    className={`${classes} m1 inline-block align-middle cursor-pointer`}
    x="0" y="0" width="24px" height="24px"
    viewBox="0 0 24 24"
    onClick={onClick}
  >
    <g>
      <path
        fill={color}
        d="M3.515,3.515 C8.201,-1.172 15.799,-1.172 20.485,3.515 C25.172,8.201 25.172,15.799 20.485,20.485 C15.799,25.172 8.201,25.172 3.515,20.485 C-1.172,15.799 -1.172,8.201 3.515,3.515 z M6.343,6.343 C5.757,6.929 5.682,7.804 6.176,8.297 L9.879,12 L6.176,15.703 C5.682,16.196 5.757,17.071 6.343,17.657 C6.929,18.243 7.804,18.318 8.297,17.824 L12,14.121 L15.703,17.824 C16.196,18.318 17.071,18.243 17.657,17.657 C18.243,17.071 18.318,16.196 17.824,15.703 L14.121,12 L17.824,8.297 C18.318,7.804 18.243,6.929 17.657,6.343 C17.071,5.757 16.196,5.682 15.703,6.176 L12,9.879 L8.297,6.176 C7.804,5.682 6.929,5.757 6.343,6.343 z"/>
    </g>
  </svg>
)

DeleteButton.propTypes =
  { onClick: React.PropTypes.func
  , color: React.PropTypes.string
  , classes: React.PropTypes.string
  }

module.exports = DeleteButton
