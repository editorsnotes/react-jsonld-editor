const React = require('react') // eslint-disable-line no-unused-vars
    , test = require('tape')
    , {shallow} = require('enzyme')
    , RemoveButton = require('../RemoveButton')

test('is a div', t => {
  const wrapper = shallow(<RemoveButton />)
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.ok(inner.is('div'))
})

test('has a className', t => {
  const wrapper = shallow(<RemoveButton />)
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.equal(inner.props().className, 'RemoveButton')
})

test('accepts custom className props', t => {
  const wrapper = shallow(<RemoveButton className="foo" />)
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.equal(inner.props().className, 'RemoveButton foo')
})

test('accepts custom styles',t => {
  const wrapper = shallow(<RemoveButton style={{margin: 12}} />)
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.equal(inner.props().style.margin, 12)
})

test('context styles override default styles', t => {
  const wrapper = shallow(
    <RemoveButton />,
    {context: {rebass: {RemoveButton: {marginLeft: 24}}}}
  )
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.equal(inner.props().style.marginLeft, 24)
})

test('style props override context styles', t => {
  const wrapper = shallow(
    <RemoveButton m={0} style={{margin: 12}} />,
    {context: {rebass: {RemoveButton: {margin: 24}}}}
  )
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.equal(inner.props().style.margin, 12)
})

