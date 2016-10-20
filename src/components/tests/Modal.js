const React = require('react') // eslint-disable-line no-unused-vars
    , test = require('tape')
    , {shallow, mount} = require('enzyme')
    , {Dropdown, DropdownMenu} = require('rebass')
    , Modal = require('../Modal')

require('jsdom-global')()

test('is a Dropdown', t => {
  const wrapper = shallow(
    <Modal>
      <span>A</span><span>B</span>
    </Modal>)
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.ok(inner.is(Dropdown))
})

test('has a className', t => {
  const wrapper = shallow(
    <Modal>
      <span>A</span><span>B</span>
    </Modal>)
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.equal(inner.props().className, 'Modal')
})

test('accepts custom className props', t => {
  const wrapper = shallow(
    <Modal className="foo">
      <span>A</span><span>B</span>
    </Modal>)
      , inner = wrapper.first().shallow()
  t.plan(1)
  t.equal(inner.props().className, 'Modal foo')
})

test('accepts custom styles',t => {
  const wrapper = mount(
    <Modal style={{margin: 12}}>
      <span>A</span><span>B</span>
    </Modal>)
      , menu = wrapper.find(DropdownMenu).first()
  t.plan(1)
  t.equal(menu.props().style.margin, 12)
})

test('context styles override default styles', t => {
  const wrapper = mount(
    <Modal>
      <span>A</span><span>B</span>
    </Modal>,
    {context: {rebass: {Modal: {marginLeft: 24}}}}
  )
      , menu = wrapper.find(DropdownMenu).first()
  t.plan(1)
  t.equal(menu.props().style.marginLeft, 24)
})

test('style props override context styles', t => {
  const wrapper = mount(
    <Modal m={0} style={{margin: 12}}>
      <span>A</span><span>B</span>
    </Modal>,
    {context: {rebass: {Modal: {margin: 24}}}}
  )
      , menu = wrapper.find(DropdownMenu).first()
  t.plan(1)
  t.equal(menu.props().style.margin, 12)
})
