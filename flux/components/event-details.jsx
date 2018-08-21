import React from 'react';
import HandyTools from 'handy-tools';
import ClientActions from '../actions/client-actions.js';
import EventsStore from '../stores/events-store.js';
import ErrorsStore from '../stores/errors-store';
import DetailsComponent from './_details.jsx';
import { ERRORS } from '../errors.js';

export default class PageDetails extends DetailsComponent {

  constructor(props) {
    super(props);
    this.state = Object.assign(this.defaultState(), {
      event: {},
      eventSaved: {}
    });
  }

  componentDidMount() {
    this.errorsListener = ErrorsStore.addListener(this.getErrors.bind(this));
    this.eventsListener = EventsStore.addListener(this.getEvent.bind(this));
    ClientActions.fetchEvent(window.location.pathname.split("/")[3]);
  }

  componentWillUnmount() {
    this.errorsListener.remove();
    this.eventsListener.remove();
  }

  checkForChanges() {
    return !HandyTools.objectsAreEqual(this.state.event, this.state.eventSaved);
  }

  changeFieldArgs() {
    return {
      allErrors: ERRORS,
      errorsArray: this.state.errors,
      changesFunction: () => this.checkForChanges()
    }
  }

  getEvent() {
    var event = EventsStore.find(window.location.pathname.split("/")[3]);
    this.setState({
      fetching: false,
      changesToSave: false,
      event: event,
      eventSaved: HandyTools.deepCopy(event)
    });
  }

  confirmDelete() {
    this.setState({
      deleteModalOpen: false,
      fetching: true
    });
    ClientActions.deleteAndGoToIndex('events', this.state.event.id);
  }

  render() {
    return(
      <div className="event-details component">
        <h1>Event Details</h1>
        <div className="white-box">
          { HandyTools.renderSpinner(this.state.fetching) }
          { HandyTools.renderGrayedOut(this.state.fetching, -36, -32, 5) }
          <div className="row">
            <div className="col-xs-3">
              <h2>Date/Time</h2>
              <input className={ HandyTools.errorClass(this.state.errors, ERRORS.time) } onChange={ HandyTools.changeField.bind(this, this.changeFieldArgs()) } value={ this.state.event.time || "" } data-entity="event" data-field="time" />
              { HandyTools.renderFieldError(this.state.errors, ERRORS.time) }
            </div>
            <div className="col-xs-9">
              <h2>Title</h2>
              <input className={ HandyTools.errorClass(this.state.errors, ERRORS.title) } onChange={ HandyTools.changeField.bind(this, this.changeFieldArgs()) } value={ this.state.event.title || "" } data-entity="event" data-field="title" />
              { HandyTools.renderFieldError(this.state.errors, ERRORS.title) }
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <h2>Text</h2>
              <textarea rows="10" className={ HandyTools.errorClass(this.state.errors, ERRORS.text) } onChange={ HandyTools.changeField.bind(this, this.changeFieldArgs()) } value={ this.state.event.text || "" } data-entity="event" data-field="text"></textarea>
              { HandyTools.renderFieldError(this.state.errors, ERRORS.text) }
            </div>
          </div>
          { this.renderButtons() }
        </div>
        { this.renderModal('event') }
      </div>
    );
  }
};
