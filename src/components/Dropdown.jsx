const React = require('react') // eslint-disable-line no-unused-vars
    , {config, Dropdown, DropdownMenu} = require('rebass')

module.exports = ({children, style, ...props}, {rebass}) => {
  const [first, ...rest] = React.Children.toArray(children)
  const {scale, colors} = { ...config, ...rebass }
  const sx =
    { borderColor: colors.gray
    , left: 10
    , marginTop: -(scale[1] + 1)
    , overflow: 'visible'
    , width: 224
    , ...style
    }
  return (
    <Dropdown>
      { first }
      <DropdownMenu
        open
        style={sx}
        {...props}
      >
        { rest }
      </DropdownMenu>
    </Dropdown>
  )
}
