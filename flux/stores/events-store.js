var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');

var EventsStore = new Store(AppDispatcher);

var _events = {};

module.exports = EventsStore;
