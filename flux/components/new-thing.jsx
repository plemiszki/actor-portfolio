import React from 'react';
import HandyTools from 'handy-tools';
import ErrorsStore from '../stores/errors-store.js';
import ClientActions from '../actions/client-actions.js';
import DetailsComponent from './_details.jsx';
import { ERRORS } from '../errors.js';

export default class NewThing extends DetailsComponent {

  constructor(props) {
    super(props);
    this.state = Object.assign(this.defaultState(), {
      fetching: false,
      [this.props.entity]: this.props.initialObject
    });
  }

  componentDidMount() {
    this.errorsListener = ErrorsStore.addListener(this.getErrors.bind(this));
  }

  componentWillUnmount() {
    this.errorsListener.remove();
  }

  changeFieldArgs() {
    return {
      allErrors: ERRORS,
      errorsArray: this.state.errors
    }
  }

  clickAdd() {
    this.setState({
      fetching: true
    });
    ClientActions["create" + HandyTools.capitalize(this.props.entity)].call(ClientActions, this.state[this.props.entity]);
  }

  render() {
    return(
      <div className="admin-modal">
        <div className="white-box">
          { HandyTools.renderSpinner(this.state.fetching) }
          { HandyTools.renderGrayedOut(this.state.fetching, -36, -32, 5) }
          { this.renderEventFields() }
          <a className={ "btn" + HandyTools.renderDisabledButtonClass(this.state.fetching) } onClick={ this.clickAdd.bind(this) }>
            { "Add " + HandyTools.capitalize(this.props.entity) }
          </a>
        </div>
      </div>
    );
  }

  renderEventFields() {
    return(
      <div>
        <div className="row">
          <div className="col-xs-3">
            <h2>Date/Time</h2>
            <input className={ HandyTools.errorClass(this.state.errors, ERRORS.time) } onChange={ HandyTools.changeField.bind(this, this.changeFieldArgs()) } value={ this.state.event.time || "" } data-entity="event" data-field="time" />
            { this.renderFieldError(this.state.errors, ERRORS.time) }
          </div>
          <div className="col-xs-9">
            <h2>Title</h2>
            <input className={ HandyTools.errorClass(this.state.errors, ERRORS.title) } onChange={ HandyTools.changeField.bind(this, this.changeFieldArgs()) } value={ this.state[this.props.entity].title || "" } data-entity={ this.props.entity } data-field="title" />
            { this.renderFieldError(this.state.errors, ERRORS.title) }
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <h2>Text</h2>
            <textarea rows="5" className={ HandyTools.errorClass(this.state.errors, ERRORS.text) } onChange={ HandyTools.changeField.bind(this, this.changeFieldArgs()) } value={ this.state.event.text || "" } data-entity="event" data-field="text"></textarea>
            { this.renderFieldError(this.state.errors, ERRORS.text) }
          </div>
        </div>
      </div>
    );
  }
};
