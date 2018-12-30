import React from 'react';
import Modal from 'react-modal';
import HandyTools from 'handy-tools';
import ClientActions from '../actions/client-actions';
import EventsStore from '../stores/events-store';
import IndexComponent from './_index.jsx';

export default class EventsIndex extends IndexComponent {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      events: [],
      newModalOpen: false
    };
    this.getEvents = this.getEvents.bind(this);
  }

  getEvents() {
    let events = this.props.timeframe == 'upcoming' ? EventsStore.upcoming() : EventsStore.past();
    this.setState({ events }, () => this.setState({ fetching: false, newModalOpen: false }));
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

  clickNew() {
    this.setState({
      newModalOpen: true
    });
  }

  closeModal() {
    this.setState({
      newModalOpen: false
    });
  }

  render() {
    return (
      <div className="component events-index">
        <h1>{ this.props.timeframe == 'upcoming' ? 'Upcoming/Current Events' : 'Past Events' }</h1>
        { this.renderNewButton() }
        <div className="white-box">
          { HandyTools.renderSpinner(this.state.fetching) }
          { HandyTools.renderGrayedOut(this.state.fetching, -36, -32, 5) }
          <table className={ "admin-table" }>
            <thead>
              <tr>
                <th>Time</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              <tr><td></td><td></td></tr>
              { this.state.events.map(function(event, index) {
                return(
                  <tr key={ index }>
                    <td className="indent">
                      <a href={ `/admin/events/${event.id}` }>
                        { event.timeParsed }
                      </a>
                    </td>
                    <td>
                      <a href={ `/admin/events/${event.id}` }>
                        { event.title }
                      </a>
                    </td>
                  </tr>
                );
              }.bind(this)) }
            </tbody>
          </table>
        </div>
        { this.renderModal('event', { date: HandyTools.stringifyDate(new Date), endDate: HandyTools.stringifyDate(new Date), title: "", text: "" }) }
      </div>
    );
  }

  renderNewButton() {
    if (this.props.timeframe == 'upcoming') {
      return(
        <a className={ "blue-button float-button" + HandyTools.renderDisabledButtonClass(this.state.fetching) } onClick={ this.clickNew.bind(this) }>Add Event</a>
      );
    }
  }

  componentDidUpdate() {
    $('.match-height-layout').matchHeight();
  }
}
