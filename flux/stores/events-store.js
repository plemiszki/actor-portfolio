var Store = require('flux/utils').Store;
import AppDispatcher from '../dispatcher/dispatcher.js';
import HandyTools from 'handy-tools';

const EventsStore = new Store(AppDispatcher);

let _events = {};

EventsStore.setVars = function(payload) {
  _events = {};
  payload.events.forEach(function(event) {
    _events[event.id] = event;
  });
};

EventsStore.find = function(id) {
  return _events[id];
};

EventsStore.upcoming = function() {
  let events = Object.keys(_events).map(function(id) {
    return(_events[id]);
  });
  events = HandyTools.filterArrayOfDateStrings(events, 'time', { startDate: new Date().setHours(0, 0, 0, 0) })
  return HandyTools.sortArrayOfDateStrings(events, 'time');
};

EventsStore.past = function() {
  let events = Object.keys(_events).map(function(id) {
    return(_events[id]);
  });
  let today = new Date();
  let yesterday = today.setDate(today.getDate() - 1);
  events = HandyTools.filterArrayOfDateStrings(events, 'time', { endDate: yesterday })
  return HandyTools.sortArrayOfDateStrings(events, 'time').reverse();
};

EventsStore.__onDispatch = function(payload) {
  switch(payload.actionType){
    case 'EVENTS_RECEIVED':
      this.setVars(payload);
      this.__emitChange();
      break;
  }
};

export default EventsStore
