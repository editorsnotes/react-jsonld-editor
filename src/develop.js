const React = require('react') // eslint-disable-line no-unused-vars
    , {render} = require('react-dom')
    , {Map, List} = require('immutable')
    , {node, value} = require('./utils')
    , Editor = require('./Editor')
    , {rdfs, owl, xsd} = require('./namespaces')
    , ns = require('rdf-ns')
    , foaf = ns('http://xmlns.com/foaf/0.1/')
    , ex = ns('http://example.org/ns/')
    , uuid = require('node-uuid')

const mount = document.createElement('div')
document.body.appendChild(mount)

const Person = node(foaf('Person'), 'Person')
const Project = node(foaf('Project'), 'Project')
const Group = node(foaf('Group'), 'Group')
const classes = Map.of(Person.id, Person, Project.id, Project, Group.id, Group)

const name = node(foaf('name'), 'name')
  .set('@type', List.of(owl('DatatypeProperty')))
const knows = node(foaf('knows'), 'knows')
  .set('@type', List.of(owl('ObjectProperty')))
const member = node(ex('member'), 'member of')
  .set('@type', List.of(owl('ObjectProperty')))
  .set(rdfs('range'), List.of(Group))
const age = node(foaf('age'), 'age')
  .set('@type', List.of(owl('DatatypeProperty')))
  .set(rdfs('range'), List.of(node(xsd('decimal'))))
const properties = Map.of(
  name.id, name, knows.id, knows, member.id, member, age.id, age)

const Kim = node('http://viaf.org/viaf/100935834', 'Kim')
  .set('@type', List.of(Person.id))
  .set(name.id, List.of('Kim', 'キム').map(value))
const Kanye = node('http://viaf.org/viaf/61794068', 'Kanye')
  .set('@type', List.of(Person.id))
  .set(name.id, List.of('Kanye', 'Yeezy', 'Yeezus').map(value))
  .set(knows.id, List.of(Kim))
  .set(age.id, List())
const Kimye = node('http://example.org/name/Kimye', 'Kimye')
  .set('@type', List.of(Group.id))
  .set(name.id, List.of('Kimye').map(value))
const individuals = Map.of(Kanye.id, Kanye, Kim.id, Kim, Kimye.id, Kimye)

const mintID = () => {
  const {protocol, hostname} = window.location
  return `${protocol}//${hostname}/.well-known/genid/${uuid.v4()}`
}

render((
  <div>
    <Editor
      node={Kanye}
      classes={classes}
      properties={properties}
      individuals={individuals}
      mintID={mintID}
      onSave={node => console.log(node.toJS())}
      onNewNamedNode={node => console.log(node.toJS())}
    />
  </div>
), mount)

