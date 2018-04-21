import React from 'react';
import HandyTools from 'handy-tools';
import ClientActions from '../actions/client-actions';
import EventsStore from '../stores/events-store';

export default class EventsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [], fetching: true };
    this.getEvents = this.getEvents.bind(this);
  }

  getEvents() {
    let events = EventsStore.all();
    this.setState({ events }, () => this.setState({ fetching: false }));
  }

  componentDidMount() {
    this.eventsListener = EventsStore.addListener(this.getEvents);
    ClientActions.fetchEventsWithPartialId(window.location.pathname.split("/")[3]);
  }

  componentWillUnmount() {
    this.eventsListener.remove();
  }

  render() {
    return (
      <div className="component events-index">
        <h1>Events</h1>
        <div className="white-box">
          { HandyTools.renderSpinner(this.state.fetching) }
          { HandyTools.renderGrayedOut(this.state.fetching, -36, -32, 5) }
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    $('.match-height-layout').matchHeight();
  }
}
