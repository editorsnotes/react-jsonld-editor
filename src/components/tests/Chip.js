const React = require('react') // eslint-disable-line no-unused-vars
    , test = require('tape')
    , {shallow} = require('enzyme')
    , Chip = require('../Chip')

test('is a div', t => {
  const wrapper = shallow(<Chip>test</Chip>)
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.ok(inner.is('div'))
})

test('has a className', t => {
  const wrapper = shallow(<Chip>test</Chip>)
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.equal(inner.props().className, 'Chip')
})

test('accepts custom className props', t => {
  const wrapper = shallow(<Chip className="foo">test</Chip>)
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.equal(inner.props().className, 'Chip foo')
})

test('accepts custom styles',t => {
  const wrapper = shallow(<Chip style={{margin: 12}}>test</Chip>)
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.equal(inner.props().style.margin, 12)
})

test('context styles override default styles', t => {
  const wrapper = shallow(
    <Chip>test</Chip>,
    {context: {rebass: {Chip: {marginLeft: 24}}}}
  )
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.equal(inner.props().style.marginLeft, 24)
})

test('style props override context styles', t => {
  const wrapper = shallow(
    <Chip m={0} style={{margin: 12}}>test</Chip>,
    {context: {rebass: {Chip: {margin: 24}}}}
  )
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.equal(inner.props().style.margin, 12)
})

