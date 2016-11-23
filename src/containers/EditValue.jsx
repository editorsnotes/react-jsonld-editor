const React = require('react') // eslint-disable-line no-unused-vars
    , {connect} = require('react-redux')
    , {bindActionCreators} = require('redux')
    , {Input, Block} = require('rebass')
    , {List} = require('immutable')
    , ShowValue = require('./ShowValue')
    , Modal = require('../components/Modal')
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
    , {rdfs, lvont} = require('../namespaces')

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

const EditValue = (
  { path
  , value
  , input
  , editPath
  , languages
  , labelResolver
  , findDatatypes
  , findLanguages
  , updateEditPath
  , updateSuggestions
  , setIn
  , ...props
  }) => {

  const valuePath = path.push('@value')
  const typePath = path.push('@type')
  const languagePath = path.push('@language')

  const valueInput = value.value || ''
  const typeInput = value.type ? labelResolver(value.type) : ''
  const languageInput = value.language
    ? labelResolver(languageWithTag(value.language, languages).id)
    : ''

  const onTypeSuggestionSelected = (_, {suggestion}) => {
    const newValue = suggestion.id === undefined
      ? value.delete('@type')
      : value.delete('@language').set('@type', suggestion.id)
    setIn(path, newValue, {input: suggestion.label})
  }

  const onLanguageSuggestionSelected = (_, {suggestion}) => {
    const newValue = value
      .delete('@type')
      .set('@language', tagForLanguage(suggestion.id, languages))
    setIn(path, newValue, {input: suggestion.label})
  }

  return (
    <Modal onDismiss={() => updateEditPath(List())}>
      <ShowValue path={path} ml={1} mt={1} />
      <Block m={0} p={1}>

        <Input
          label="value"
          name={valuePath.join('|')}
          value={valueInput}
          onFocus={() => updateEditPath(valuePath, valueInput)}
          onChange={e => setIn(valuePath, e.target.value)}
        />

        <Autosuggest
          name="type"
          label="type"
          input={editPath.equals(typePath) ? input : typeInput}
          onFocus={() => updateEditPath(typePath, typeInput)}
          onBlur={() => updateEditPath(path)}
          onSuggestionsFetchRequested={
            ({value}) => updateSuggestions(
              [ {label: 'none'}
              , ...findDatatypes(value).filter(({id}) => id !== rdfs('Literal'))
              ]
            )
          }
          onSuggestionsClearRequested={() => updateSuggestions([])}
          onSuggestionSelected={onTypeSuggestionSelected}
          shouldRenderSuggestions={() => true}
          focused={editPath.equals(typePath)}
          {...props}
        />

  { value.type === undefined
      ? <Autosuggest
          name="language"
          label="language"
          input={editPath.equals(languagePath) ? input : languageInput}
          onFocus={() => updateEditPath(languagePath, languageInput)}
          onBlur={() => updateEditPath(path)}
          onSuggestionsFetchRequested={
            ({value}) => updateSuggestions(findLanguages(value))
          }
          onSuggestionsClearRequested={() => updateSuggestions([])}
          onSuggestionSelected={onLanguageSuggestionSelected}
          focused={editPath.equals(languagePath)}
          {...props}
        />
      : ''
  }
      </Block>
    </Modal>
  )
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(EditValue)
