const React = require('react') // eslint-disable-line no-unused-vars
    , {Block} = require('rebass')

const FlexRow = ({children, margins = {ml: 1, mt: 1}, ...props}) => {
  const [last, ...rest] = React.Children.toArray(children).reverse()
  return (
    <Block
      className="FlexRow"
      mt={2}
      {...props}
      style={
        { display: 'flex'
        , flexDirection: 'row'
        , flexWrap: 'wrap'
        , lineHeight: 2
        }
    }>
      { rest.reverse().map(e => React.cloneElement(e, margins)) }
      { React.cloneElement(last, {...margins, style: {flex: 1}}) }
    </Block>
  )
}

module.exports = FlexRow
