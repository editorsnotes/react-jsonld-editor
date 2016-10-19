const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {Input, Block} = require('rebass')
    , {List} = require('immutable')
    , ShowValue = require('./ShowValue')
    , Dropdown = require('../components/Dropdown')
    , Autosuggest = require('../components/Autosuggest')
    , { getNode
      , getInput
      , getSuggestions
      , getEditPath
      , getLanguages
      , getLabelResolver
      , getDatatypeSuggester
      , getLanguageSuggester
      } = require('../selectors')
    , { updateEditPath
      , updateInput
      , updateSuggestions
      , setIn
      } = require('../actions')
    , {rdf, lvont} = require('../namespaces')

const mapStateToProps = (state, {path}) => (
  { value: getNode(state).getIn(path)
  , input: getInput(state)
  , suggestions: getSuggestions(state)
  , editPath: getEditPath(state)
  , languages: getLanguages(state)
  , labelResolver: getLabelResolver(state)
  , findDatatypes: getDatatypeSuggester(state)
  , findLanguages: getLanguageSuggester(state)
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(
  {updateEditPath, updateInput, updateSuggestions, setIn}, dispatch)

const languageWithTag = (tag, languages) => languages.find(
  language => language.get(lvont('iso639P1Code')).first().value === tag
)

const tagForLanguage = (language_id, languages) => languages
  .get(language_id)
  .get(lvont('iso639P1Code'))
  .first().value

const autosuggestProps = (
  { path
  , value
  , editPath
  , input
  , suggester
  , suggestions
  , labelFor
  , updateEditPath
  , updateInput
  , updateSuggestions
  , setIn
  , newValue
  }) => (

  { name: path.join('|')
  , input: path.equals(editPath) ? input : labelFor(value)
  , suggestions
  , onFocus:
      () => updateEditPath(path, labelFor(value))
  , onBlur:
      () => updateEditPath(path.pop())
  , onChange:
      e => { if (e.type === 'change') { updateInput(e.target.value) }}
  , onSuggestionsFetchRequested:
      ({value}) => updateSuggestions(suggester(value))
  , onSuggestionsClearRequested:
      () => updateSuggestions([])
  , onSuggestionSelected:
      (_, {suggestion}) => setIn(
        path.pop(), newValue(suggestion.id), {input: suggestion.label})
  }
)

const EditValue = (
  { path
  , value
  , languages
  , findDatatypes
  , findLanguages
  , labelResolver
  , updateEditPath
  , setIn
  , ...props
  }) => {

  const valuePath = path.push('@value')

  return (
    <Dropdown onDismiss={() => updateEditPath(List())}>
      <ShowValue path={path} mr={1} mt={1} />
      <Block m={0} p={1}>

        <Input
          label="value"
          name={valuePath.join('|')}
          value={value.value}
          onFocus={() => updateEditPath(valuePath)}
          onChange={e => setIn(valuePath, e.target.value)}
        />

        <Autosuggest
          label="type"
          shouldRenderSuggestions={() => true}
          {...autosuggestProps(
            { ...props
            , path: path.push('@type')
            , value: value.type
            , suggester: findDatatypes
            , labelFor: value => value ? labelResolver(value) : ''
            , updateEditPath
            , setIn
            , newValue: type => type === rdf('langString')
                ? value.set('@type', rdf('langString'))
                : value.set('@type', type).delete('@language')
            })
          }
        />

  { value.type === rdf('langString')
      ? <Autosuggest
          label="language"
          {...autosuggestProps(
            { ...props
            , path: path.push('@language')
            , value: value.language
            , suggester: findLanguages
            , labelFor: value => value
                ? labelResolver(languageWithTag(value, languages).id)
                : ''
            , updateEditPath
            , setIn
            , newValue: language => value
                .set('@type', rdf('langString'))
                .set('@language', tagForLanguage(language, languages))
            })
          }
        />
      : ''
  }
      </Block>
    </Dropdown>
  )
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EditValue)
