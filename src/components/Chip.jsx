const React = require('react') // eslint-disable-line no-unused-vars
    , {Base, config} = require('rebass')
    , RemoveButton = require('./RemoveButton')

const Chip = (
  {children, style, onClick, onClickDelete, ...props}, { rebass }) => {

  const { fontSizes, scale, colors } = { ...config, ...rebass }

  const sx =
    { root:
      { display: 'inline-flex'
      , alignItems: 'center'
      , justifyContent: 'center'
      , height: scale[3]
      , lineHeight: scale[3]
      , color: colors.black
      , backgroundColor: colors.gray
      , cursor: onClick ? 'pointer' : 'default'
      , ...style
      }
    , inner:
      { pointerEvents: 'none'
      , marginLeft: fontSizes[6]
      , marginRight: onClickDelete ? 0 : fontSizes[6]
      }
    , remove:
      { margin: `0 ${fontSizes[2] / 6}px`
      }
    }

  return (
    <Base
      className="Chip"
      baseStyle={sx.root}
      pill rounded
      onClick={onClick}
      {...props}
    >
      <div style={sx.inner}>
        {children}
      </div>
      { onClickDelete
          ? <RemoveButton
              color={props.backgroundColor === 'black'
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
    </Base>
  )
}

Chip.propTypes = {
  onClick: React.PropTypes.func,
  onClickDelete: React.PropTypes.func
}

module.exports = Chip
