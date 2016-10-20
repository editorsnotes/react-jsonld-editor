const React = require('react') // eslint-disable-line no-unused-vars
    , classnames = require('classnames')
    , {withRebass} = require('rebass')
    , Cancel = require('react-icons/lib/md/cancel')

const RemoveButton = (
  { className
  , style
  , theme
  , subComponentStyles
  , ...props
  }) => {

  const {fontSizes} = theme

  const cx = classnames('RemoveButton', className)

  const
    { color
    , ...rootStyle
    } = style

  const sx =
    { root:
      { height: `${fontSizes[2]}px`
      , width: `${fontSizes[2]}px`
      , position: 'relative'
      , ...rootStyle
      }
    , icon:
      { cursor: 'pointer'
      , position: 'absolute'
      , ...subComponentStyles.icon
      }
    }

  return (
    <div
      className={cx}
      style={sx.root}
      {...props}
    >
      <Cancel
        size={fontSizes[2]}
        color={color}
        style={sx.icon}
      />
    </div>
  )
}

RemoveButton._name = 'RemoveButton'

module.exports = withRebass(RemoveButton)
