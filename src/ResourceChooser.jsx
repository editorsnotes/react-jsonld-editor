var React = require('react')
  , {Map, List} = require('immutable')
  , Autocomplete = require('react-autocomplete')

module.exports = React.createClass({
  displayName: 'ResourceChooser',

  propTypes: {
    label: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    resources: React.PropTypes.array,
    resourceLabels: React.PropTypes.instanceOf(Map),
    shapes: React.PropTypes.instanceOf(Map),
    onSelect: React.PropTypes.func.isRequired,
  },

  getDefaultProps: function() {
    return {
      label: '',
      placeholder: '',
      resources: [],
      resourceLabels: new Map(),
      shapes: new Map()
    }
  },

  _labelFor: function(x) {
    return this.props.resourceLabels.get(x, List.of('MISSING LABEL')).first()
  },

  _shouldResourceRender: function(uri, input) {
    return this.props.resourceLabels.get(uri) &&
      this._labelFor(uri).toLowerCase().indexOf(input.toLowerCase()) !== -1
  },

  _sortResources: function(uri_a, uri_b, input) {
    let a = this._labelFor(uri_a)
    let b = this._labelFor(uri_b)
    if (input.length == 0) {
        return a < b ? -1 : (a > b ? 1 : 0)
    } else {
      return (
        a.toLowerCase().indexOf(input.toLowerCase()) >
        b.toLowerCase().indexOf(input.toLowerCase()) ? 1 : -1
      )
    }
  },

  render: function () {
    return (
      <Autocomplete
        initialValue=""
        inputProps={{
          autofocus: 'autofocus',
          placeholder: this.props.placeholder,
          className: 'input'}}
        labelText={this.props.label}
        items={this.props.resources}
        getItemValue={uri => uri}
        shouldItemRender={this._shouldResourceRender}
        sortItems={this._sortResources}
        renderMenu={(items, value, style) => (
          <div
            className="bg-white border border-silver fixed overflow-auto"
            children={items}
            style={{...style, maxHeight: '50%', marginTop: '-1rem'}}
          />
        )}
        renderItem={(uri, isHighlighted) => (
          <div
            key={uri}
            className={isHighlighted ? 'bg-silver px2 py1' : 'px2 py1'}
            style={{cursor: 'default'}}
          >{this._labelFor(uri)}</div>
        )}
        onSelect={this.props.onSelect}
      />
    )
  }
})
