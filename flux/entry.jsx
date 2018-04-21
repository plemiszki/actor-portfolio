import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import EventsIndex from './components/events-index';

$(document).ready(function() {
  ReactModal.setAppElement(document.body);
  if ($('#events-index-upcoming')[0]) {
    ReactDOM.render(<EventsIndex timeframe={ 'upcoming' } />, document.getElementById("events-index-upcoming"));
  }
  if ($('#events-index-upcoming')[0]) {
    ReactDOM.render(<EventsIndex timeframe={ 'past' } />, document.getElementById("events-index-past"));
  }
});
