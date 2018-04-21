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
  }
}

module.exports = ClientActions;
