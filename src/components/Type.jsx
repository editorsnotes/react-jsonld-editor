const React = require('react') // eslint-disable-line no-unused-vars
    , {List, Iterable} = require('immutable')
    , ShowIdentifier = require('../containers/ShowIdentifier')
    , AddTypeIdentifier = require('../containers/AddTypeIdentifier')

const item = (child, key) => (
  <li
    key={key}
    className="inline-block mr1 mb1"
  >
    {child}
  </li>
)

const Type = (
  { ids
  , path
  , onAppend = null
  , onAccept = null
  }) => {
  return (
    <li className="mb1 relative">
      <div
        className="m1 inline-block align-middle"
        style={{width: '24px', height: '24px'}}
      />
      <span
        className={
          `inline-block align-middle bold lowercase black
           ${onAppend ? 'cursor-pointer' : 'muted'}`
        }
        onClick={onAppend}
      >
        {`is a ${onAppend ? '+' : ''}`}
      </span>
      <ul className="list-reset ml3">
        {ids.map((id, i) => item(<ShowIdentifier path={path.push(i)} />, id))}
        {onAccept
          ? item(<AddTypeIdentifier onAccept={onAccept}/>)
          : null
        }
      </ul>
    </li>
  )
}

Type.propTypes =
  { ids: (props, propName, componentName)  => {
      if (! Iterable.isIndexed(props[propName])) {
        return new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`: must be an Indexed Iterable.'
        )
      }
    }
  , path: React.PropTypes.instanceOf(List).isRequired
  , onAppend: React.PropTypes.func
  , onAccept: React.PropTypes.func
  }

module.exports = Type
