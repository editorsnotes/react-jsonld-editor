const React = require('react') // eslint-disable-line no-unused-vars
    , {config, Base} = require('rebass')
    , Cancel = require('react-icons/lib/md/cancel')

module.exports = ({color, style, ...props}, { rebass }) => {

  const {fontSizes, colors} = { ...config, ...rebass }
  const sx =
    { root:
      { height: `${fontSizes[2]}px`
      , width: `${fontSizes[2]}px`
      , position: 'relative'
      , ...style
      }
    , icon:
      { cursor: 'pointer'
      , position: 'absolute'
      }
    }

  return (
    <Base
      className="RemoveButton"
      baseStyle={sx.root}
      {...props}
    >
      <Cancel
        size={fontSizes[2]}
        style={sx.icon}
        color={color || colors.red}
      />
    </Base>
  )
}
