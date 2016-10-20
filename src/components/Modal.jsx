const React = require('react') // eslint-disable-line no-unused-vars
    , classnames = require('classnames')
    , {withRebass, Dropdown, DropdownMenu} = require('rebass')

const Modal = (
  { children
  , className
  , style
  , theme
  , ...props
  }) => {

  const {colors} = theme

  const cx = classnames('Modal', className)

  const [first, ...rest] = React.Children.toArray(children)

  const sx =
    { borderColor: colors.muted
    , left: 10
    , overflow: 'visible'
    , width: 224
    , ...style
    }

  return (
    <Dropdown className={cx}>
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

Modal._name = 'Modal'

module.exports = withRebass(Modal)
