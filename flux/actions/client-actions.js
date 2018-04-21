import AppDispatcher from '../dispatcher/dispatcher.js';
import ServerActions from '../actions/server-actions.js';

const ClientActions = {

  fetchEvents: function() {
    $.ajax({
      url: '/api/events',
      method: 'GET',
      success: function(response) {
        ServerActions.receiveEvents(response);
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
          id: event.id,
          date: event.date,
          end_date: event.endDate,
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
