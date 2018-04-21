import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import EventsIndex from './components/events-index';

$(document).ready(function() {
  ReactModal.setAppElement(document.body);
  if ($('#events-index')[0]) {
    ReactDOM.render(<EventsIndex />, document.getElementById("events-index"));
  }
});
