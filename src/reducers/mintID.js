const {Set} = require('immutable')
    , {UPDATE_MINT_ID} = require('../actions')

const noop = () => undefined
const acceptsNone = () => false
const acceptsAny = () => true

noop.accepts = acceptsNone

const acceptsSome = accepts => types => (
  typeof types === 'string'
    ? Set.of(types)
    : types).some(accepts)

module.exports = (mintID = noop, action) => {
  let nextMintID = mintID
  switch (action.type) {

    case UPDATE_MINT_ID:
      nextMintID = action.mintID || mintID
      break
  }
  if (! nextMintID.accepts) { nextMintID.accepts = acceptsAny }
  nextMintID.acceptsSome = acceptsSome(nextMintID.accepts)
  return nextMintID
}
