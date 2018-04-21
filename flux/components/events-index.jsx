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
    let events = this.props.timeframe == 'upcoming' ? EventsStore.upcoming() : EventsStore.past();
    this.setState({ events }, () => this.setState({ fetching: false }));
  }

  componentDidMount() {
    this.eventsListener = EventsStore.addListener(this.getEvents);
    if (this.props.timeframe == 'upcoming') {
      ClientActions.fetchEvents();
    }
  }

  componentWillUnmount() {
    this.eventsListener.remove();
  }

  redirect(id) {
    window.location.pathname = "admin/events/" + id;
  }

  render() {
    return (
      <div className="component events-index">
        <h1>{ this.props.timeframe == 'upcoming' ? 'Upcoming/Current Events' : 'Past Events' }</h1>
        <div className="white-box">
          { HandyTools.renderSpinner(this.state.fetching) }
          { HandyTools.renderGrayedOut(this.state.fetching, -36, -32, 5) }
          <table className={ "admin-table" }>
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              <tr><td></td><td></td></tr>
              { this.state.events.map(function(event, index) {
                return(
                  <tr key={ index } onClick={ this.redirect.bind(this, event.id) }>
                    <td className="indent">
                      { event.date }
                    </td>
                    <td>
                      { event.endDate }
                    </td>
                    <td>
                      { event.title }
                    </td>
                  </tr>
                );
              }.bind(this)) }
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  componentDidUpdate() {
    // $('.match-height-layout').matchHeight();
  }
}
