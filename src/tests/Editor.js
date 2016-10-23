const React = require('react') // eslint-disable-line no-unused-vars
    , test = require('tape')
    , {Provider} = require('react-redux')
    , {Map} = require('immutable')
    , {shallow, mount} = require('enzyme')
    , Editor = require('../Editor')
    , EditNode = require('../containers/EditNode')
    , AddProperty = require('../containers/AddProperty')
    , AddTypeIdentifier = require('../containers/AddTypeIdentifier')
    , {node} = require('../utils')
    , {rdfs, owl} = require('../namespaces')
    , ns = require('rdf-ns')
    , ex = ns('http://example.org/ns/')

require('jsdom-global')()

test('is an EditNode inside a Provider', t=> {
  const wrapper = shallow(<Editor />)
      , provider = wrapper.first().shallow()
      , inner = provider.first().shallow()
  t.plan(2)
  t.ok(provider.is(Provider))
  t.ok(inner.is(EditNode))
})

test('accepts custom className props', t => {
  const wrapper = shallow(<Editor className="foo" />)
      , inner = wrapper.first().shallow().first().shallow()
  t.plan(1)
  t.equal(inner.props().className, 'foo')
})

test('accepts Rebass props',t => {
  const wrapper = shallow(<Editor m={4} />)
      , inner = wrapper.first().shallow().first().shallow()
  t.plan(1)
  t.equal(inner.props().style.margin, 64)
})

test('accepts custom styles',t => {
  const wrapper = shallow(<Editor style={{margin: 48}} />)
      , inner = wrapper.first().shallow().first().shallow()
  t.plan(1)
  t.equal(inner.props().style.margin, 48)
})

test('context styles override default styles', t => {
  const wrapper = shallow(<Editor />,
    {context: {rebass: {Editor: {marginLeft: 66}}}}
  )
      , inner = wrapper.first().shallow().first().shallow()
  t.plan(1)
  t.equal(inner.props().style.marginLeft, 66)
})

test('style props override context styles', t => {
  const wrapper = shallow(<Editor m={0} style={{margin: 12}} />,
    {context: {rebass: {Editor: {margin: 24}}}}
  )
      , inner = wrapper.first().shallow().first().shallow()
  t.plan(1)
  t.equal(inner.props().style.margin, 12)
})

test('do not show AddProperty if no unused properties or mintID', t=> {
  const n = node(ex('Test'), 'Test')
  const wrapper = mount(<Editor node={n} />)
  t.plan(1)
  t.equal(wrapper.find(AddProperty).length, 0)
})

test('do show AddProperty if has properties', t=> {
  const p = node(ex('test'), 'test', [owl('DatatypeProperty')])
  const wrapper = mount(<Editor properties={Map.of(p.id, p)} />)
  t.plan(1)
  t.equal(wrapper.find(AddProperty).length, 1)
})

test('do show AddProperty if has mintID', t=> {
  const wrapper = mount(<Editor mintID={() => 'new-id'}/>)
  t.plan(1)
  t.equal(wrapper.find(AddProperty).length, 1)
})

test('do not show AddTypeIdentifier if no classes or mintID', t=> {
  const wrapper = mount(<Editor />)
  t.plan(1)
  t.equal(wrapper.find(AddTypeIdentifier).length, 0)
})

test('do not show AddTypeIdentifier if no unused classes or mintID', t=> {
  const c = node(ex('SomeClass'), 'SomeClass', [rdfs('Class')])
  const n = node(ex('Test'), 'Test', [c.id])
  const wrapper = mount(<Editor node={n} classes={Map.of(c.id, c)} />)
  t.plan(1)
  t.equal(wrapper.find(AddTypeIdentifier).length, 0)
})

test('do show AddTypeIdentifier if has classes', t=> {
  const c = node(ex('Test'), 'Test', [rdfs('Class')])
  const wrapper = mount(<Editor classes={Map.of(c.id, c)} />)
  t.plan(1)
  t.equal(wrapper.find(AddTypeIdentifier).length, 1)
})

test('do show AddTypeIdentifier if has mintID', t=> {
  const wrapper = mount(<Editor mintID={() => 'new-id'}/>)
  t.plan(1)
  t.equal(wrapper.find(AddTypeIdentifier).length, 1)
})
