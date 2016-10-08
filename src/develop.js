const React = require('react') // eslint-disable-line no-unused-vars
    , {render} = require('react-dom')
    , {Map, List} = require('immutable')
    , IJLD = require('immutable-jsonld')
    , Editor = require('./Editor')
    , {rdfs, owl} = require('./namespaces')
    , ns = require('rdf-ns')
    , foaf = ns('http://xmlns.com/foaf/0.1/')

const mount = document.createElement('div')
document.body.appendChild(mount)

const value = v => IJLD.JSONLDValue({'@value': v})
const node = (id, label) => IJLD.JSONLDNode(
  { '@id': id
  , [rdfs('label')]: List.of(value(label))
  }
)

const Person = node(foaf('Person'), 'Person')
const Project = node(foaf('Project'), 'Project')
const Group = node(foaf('Group'), 'Group')
const classes = Map.of(Person.id, Person, Project.id, Project, Group.id, Group)

const label = node(rdfs('label'), 'label')
  .set('@type', List.of(owl('AnnotationProperty')))
const name = node(foaf('name'), 'name')
  .set('@type', List.of(owl('DatatypeProperty')))
const knows = node(foaf('knows'), 'knows')
  .set('@type', List.of(owl('ObjectProperty')))
const member = node(foaf('member'), 'member')
  .set('@type', List.of(owl('ObjectProperty')))
const properties = Map.of(
  label.id, label, name.id, name, knows.id, knows, member.id, member)

const Kim = node('http://viaf.org/viaf/100935834', 'Kim')
  .set('@type', List.of(Person.id))
  .set(name.id, List.of('Kim', 'キム').map(value))
const Kanye = node('http://viaf.org/viaf/61794068', 'Kanye')
  .set('@type', List.of(Person.id))
  .set(name.id, List.of('Kanye', 'Yeezy', 'Yeezus').map(value))
  .set(knows.id, List.of(Kim))
const Kimye = node('http://example.org/name/Kimye', 'Kimye')
  .set('@type', List.of(Group.id))
  .set(name.id, List.of('Kimye').map(value))
const individuals = Map.of(Kanye.id, Kanye, Kim.id, Kim, Kimye.id, Kimye)

render((
  <div>
    <Editor
      node={Kanye}
      classes={classes}
      properties={properties}
      individuals={individuals}
      onSave={node => console.log(node.toJS())}
    />
  </div>
), mount)

