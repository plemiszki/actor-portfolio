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

  if (document.querySelector('#news-items-index')) {
    ReactDOM.render(
      <Provider context={ MyContext } store={ store }>
        <StandardIndex
          context={ MyContext }
          entityName='newsItem'
          header={ 'News' }
          columns={ ['date', 'header'] }
          modalDimensions={ { height: 432, width: 1000 } }
        >
          <NewEntity
            context={ MyContext }
            initialEntity={ { header: '', text: '', date: '' } }
          />
        </StandardIndex>
      </Provider>,
      document.querySelector('#news-items-index')
    );
  }

  if (document.querySelector('#news-item-details')) {
    ReactDOM.render(
      <Provider context={ MyContext } store={ store }>
        <SimpleDetails
          context={ MyContext }
          entityName='newsItem'
          initialEntity={ { date: '', header: '', text: '' } }
          fields={ [
            [
              { columnWidth: 2, entity: 'newsItem', property: 'date' },
              { columnWidth: 10, entity: 'newsItem', property: 'header' },
            ],
            [
              { columnWidth: 12, entity: 'newsItem', property: 'text', type: 'textbox', rows: 5 }
            ]
          ] }
        />
      </Provider>,
      document.querySelector('#news-item-details')
    );
  }

  if (document.querySelector('#episodes-index')) {
    ReactDOM.render(
      <Provider context={ MyContext } store={ store }>
        <StandardIndex
          context={ MyContext }
          entityName='episode'
          columns={ ['number', 'title', 'guest'] }
          columnHeaders={ ['', '', 'Guest Star'] }
          columnWidths={ [200] }
          modalDimensions={ { height: 432, width: 1000 } }
        >
          <NewEntity
            context={ MyContext }
            initialEntity={ { number: '', title: '', url: '', synopsis: '', guest: '' } }
          />
        </StandardIndex>
      </Provider>,
      document.querySelector('#episodes-index')
    );
  }

  if (document.querySelector('#episode-details')) {
    ReactDOM.render(
      <Provider context={ MyContext } store={ store }>
        <SimpleDetails
          context={ MyContext }
          entityName='episode'
          initialEntity={ { number: '', title: '', url: '', synopsis: '', guest: '' } }
          fields={ [
            [
              { columnWidth: 2, entity: 'episode', property: 'number' },
              { columnWidth: 3, entity: 'episode', property: 'title' },
              { columnWidth: 3, entity: 'episode', property: 'guest', columnHeader: 'Guest Star' },
              { columnWidth: 4, entity: 'episode', property: 'url', columnHeader: 'YouTube ID' }
            ],
            [
              { columnWidth: 12, entity: 'episode', property: 'synopsis', type: 'textbox', rows: 5 }
            ]
          ] }
        />
      </Provider>,
      document.querySelector('#episode-details')
    );
  }
});
