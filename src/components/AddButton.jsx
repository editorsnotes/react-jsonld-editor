const React = require('react') // eslint-disable-line no-unused-vars

const AddButton = ({onClick, color='#2ECC40', classes = ''}) => (
  <svg
    className={`${classes} m1 inline-block align-middle cursor-pointer`}
    x="0" y="0" width="24px" height="24px"
    viewBox="0 0 24 24"
    onClick={onClick}
  >
    <g>
      <path
        fill={color}
        d="M12,-0 C18.627,-0 24,5.373 24,12 C24,18.627 18.627,24 12,24 C5.373,24 -0,18.627 -0,12 C-0,5.373 5.373,-0 12,-0 z M12,4 C11.172,4 10.5,4.565 10.5,5.263 L10.5,10.5 L5.263,10.5 C4.565,10.5 4,11.172 4,12 C4,12.828 4.565,13.5 5.263,13.5 L10.5,13.5 L10.5,18.737 C10.5,19.435 11.172,20 12,20 C12.828,20 13.5,19.435 13.5,18.737 L13.5,13.5 L18.737,13.5 C19.435,13.5 20,12.828 20,12 C20,11.172 19.435,10.5 18.737,10.5 L13.5,10.5 L13.5,5.263 C13.5,4.565 12.828,4 12,4 z"
      />
    </g>
  </svg>
)

AddButton.propTypes =
  { onClick: React.PropTypes.func
  , classes: React.PropTypes.string
  }

module.exports = AddButton
