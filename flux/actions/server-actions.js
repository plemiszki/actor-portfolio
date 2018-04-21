import AppDispatcher from '../dispatcher/dispatcher.js';

const ServerActions = {

  receiveErrors: function(response) {
    AppDispatcher.dispatch({
      actionType: "ERRORS_RECEIVED",
      errors: response.responseJSON
    });
  }
}
