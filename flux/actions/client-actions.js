import AppDispatcher from '../dispatcher/dispatcher.js';
import ServerActions from '../actions/server-actions.js';

const ClientActions = {

  deleteAndGoToIndex: function(directory, id) {
    $.ajax({
      url: '/api/' + directory + '/' + id,
      method: 'DELETE',
      success: function() {
        window.location.pathname = '/admin/' + directory;
      }
    });
  },

  fetchEvents: function() {
    $.ajax({
      url: '/api/events',
      method: 'GET',
      success: function(response) {
        ServerActions.receiveEvents(response);
      }
    });
  },

  createEvent: function(event) {
    $.ajax({
      url: '/api/events',
      method: 'POST',
      data: {
        event: {
          time: event.time,
          title: event.title,
          text: event.text
        }
      },
      success: function(response) {
        ServerActions.receiveEvents(response);
      },
      error: function(response) {
        ServerActions.receiveErrors(response);
      }
    });
  },

  fetchEvent: function(id) {
    $.ajax({
      url: '/api/events/' + id,
      method: 'GET',
      success: function(response) {
        ServerActions.receiveEvents(response);
      }
    });
  },

  updateEvent: function(event) {
    $.ajax({
      url: '/api/events/' + event.id,
      method: 'PATCH',
      data: {
        event: {
          time: event.time,
          title: event.title,
          text: event.text
        }
      },
      success: function(response) {
        ServerActions.receiveEvents(response);
      },
      error: function(response) {
        ServerActions.receiveErrors(response);
      }
    });
  }
}

module.exports = ClientActions;
