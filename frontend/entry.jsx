import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactModal from 'react-modal';
import { SimpleDetails, StandardIndex, TabbedIndex } from 'handy-components';

import EventDetails from './containers/event-details';
import NewEntity from './containers/new-entity';

import TabActions from './containers/modules/tab-actions.js';

import configureStore from './store/store';
let store = configureStore();

$(document).ready(() => {

  ReactModal.setAppElement(document.body);
  const MyContext = React.createContext();

  if (document.querySelector('#events-index')) {
    ReactDOM.render(
      <Provider context={ MyContext } store={ store }>
        <TabbedIndex
          context={ MyContext }
          entityName='event'
          columns={ ['time', 'title'] }
          modalDimensions={ { height: 432, width: 1000 } }
          tabs={ ['upcoming', 'completed'] }
          sortDesc={ { completed: ['time'] } }
          newEntityTab='upcoming'
          tabActions={ TabActions }
        >
          <NewEntity
            context={ MyContext }
            initialEntity={ { time: "", title: "", text: "" } }
          />
        </TabbedIndex>
      </Provider>,
      document.querySelector('#events-index')
    );
  }

  if (document.querySelector('#event-details')) {
    ReactDOM.render(
      <Provider context={ MyContext } store={ store }>
        <EventDetails
          context={ MyContext }
        />
      </Provider>,
      document.querySelector('#event-details')
    );
  }
});
