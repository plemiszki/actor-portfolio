import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from 'react-modal'
import ChangeCase from 'change-case'
import { Common, Details } from 'handy-components'
import HandyTools from 'handy-tools'
import { createEntity } from '../actions/index'

class NewEntity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      [this.props.entityName]: HandyTools.deepCopy(this.props.initialEntity),
      errors: []
    };
  }

  componentDidMount() {
    HandyTools.setUpNiceSelect({ selector: '.admin-modal select', func: Details.changeField.bind(this, this.changeFieldArgs()) });
  }

  clickAdd(e) {
    e.preventDefault();
    this.setState({
      fetching: true
    });
    this.props.createEntity({
      directory: HandyTools.convertToUnderscore(this.props.entityNamePlural),
      entityName: this.props.entityName,
      entity: this.state[this.props.entityName],
      arrayName: this.props.entityNamePlural
    }).then(() => {
      this.setState({
        fetching: false,
        [this.props.entityName]: HandyTools.deepCopy(this.props.initialEntity)
      });
      this.props.callback(this.props.entities);
    }, () => {
      this.setState({
        fetching: false,
        errors: this.props.errors
      });
    });
  }

  changeFieldArgs() {
    return {
      allErrors: Errors,
      errorsArray: this.state.errors
    }
  }

  render() {
    return(
      <div className="component admin-modal">
        <form className="white-box">
          { Common.renderSpinner(this.state.fetching) }
          { Common.renderGrayedOut(this.state.fetching, -36, -32, 5) }
          { this.renderFields() }
          <input type="submit" className={ "btn" + Common.renderDisabledButtonClass(this.state.fetching) } value={ this.props.buttonText || `Add ${HandyTools.capitalize(ChangeCase.titleCase(this.props.entityName))}` } onClick={ this.clickAdd.bind(this) } />
        </form>
      </div>
    );
  }

  renderFields() {
    switch (this.props.entityName) {
      case 'event':
        return([
          <div key="1" className="row">
            { Details.renderField.bind(this)({ columnWidth: 3, entity: 'event', property: 'time', columnHeader: 'Date/Time', placeholder: '7/21/18 5:30 pm' }) }
            { Details.renderField.bind(this)({ columnWidth: 9, entity: 'event', property: 'title' }) }
          </div>,
          <div key="2" className="row">
            { Details.renderTextBox.bind(this)({ rows: 5, columnWidth: 12, entity: 'event', property: 'text' }) }
          </div>
        ]);
      case 'newsItem':
        return([
          <div key="1" className="row">
            { Details.renderField.bind(this)({ columnWidth: 2, entity: 'newsItem', property: 'date' }) }
            { Details.renderField.bind(this)({ columnWidth: 10, entity: 'newsItem', property: 'header' }) }
          </div>,
          <div key="2" className="row">
            { Details.renderTextBox.bind(this)({ rows: 5, columnWidth: 12, entity: 'newsItem', property: 'text' }) }
          </div>
        ]);
      case 'episode':
        return([
          <div key="1" className="row">
            { Details.renderField.bind(this)({ columnWidth: 2, entity: 'episode', property: 'number' }) }
            { Details.renderField.bind(this)({ columnWidth: 3, entity: 'episode', property: 'title' }) }
            { Details.renderField.bind(this)({ columnWidth: 3, entity: 'episode', property: 'guest', columnHeader: 'Guest Star' }) }
            { Details.renderField.bind(this)({ columnWidth: 4, entity: 'episode', property: 'url', columnHeader: 'YouTube Url' }) }
          </div>,
          <div key="2" className="row">
            { Details.renderTextBox.bind(this)({ rows: 5, columnWidth: 12, entity: 'episode', property: 'synopsis' }) }
          </div>
        ]);
    }
  }
}

const mapStateToProps = (reducers) => {
  return {
    entities: reducers.standardReducer.entities,
    errors: reducers.standardReducer.errors
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createEntity }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEntity);
