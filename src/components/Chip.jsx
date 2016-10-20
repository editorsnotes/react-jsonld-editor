const React = require('react') // eslint-disable-line no-unused-vars
    , classnames = require('classnames')
    , {withRebass} = require('rebass')
    , RemoveButton = require('./RemoveButton')

const Chip = (
  { children
  , onClick
  , onClickDelete
  , className
  , style
  , theme
  , subComponentStyles
  , ...props
  }) => {

  const {fontSizes, scale, colors} = theme

  const cx = classnames('Chip', className)

  const {
    ...rootStyle
  } = style

  const sx =
    { root:
      { display: 'inline-flex'
      , alignItems: 'center'
      , justifyContent: 'center'
      , height: scale[3]
      , lineHeight: scale[3]
      , color: colors.default
      , backgroundColor: colors.muted
      , cursor: onClick ? 'pointer' : 'default'
      , ...rootStyle
      }
    , inner:
      { pointerEvents: 'none'
      , marginLeft: fontSizes[6]
      , marginRight: onClickDelete ? 0 : fontSizes[6]
      , ...subComponentStyles.inner
      }
    , remove:
      { margin: `0 ${fontSizes[2] / 6}px`
      , ...subComponentStyles.remove
      }
    }

  return (
    <div
      className={cx}
      style={sx.root}
      onClick={onClick}
      {...props}
    >
      <div style={sx.inner}>
        {children}
      </div>
      { onClickDelete
          ? <RemoveButton
              color={style.backgroundColor === colors.black
                ? 'rgba(255, 255, 255, 0.54)'
                : 'rgba(0, 0, 0, 0.54)'}
              style={sx.remove}
              onClick={e => {
                e.stopPropagation()
                onClickDelete()
              }}
            />
          : null
      }
    </div>
  )
}

Chip.propTypes = {
  onClick: React.PropTypes.func,
  onClickDelete: React.PropTypes.func
}

Chip._name = 'Chip'

module.exports = props => React.createElement(
  withRebass(Chip), {pill: true, ...props})
