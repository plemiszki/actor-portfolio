import React from 'react';
import Modal from 'react-modal';
import HandyTools from 'handy-tools';
import ClientActions from '../actions/client-actions.js';
import ErrorsStore from '../stores/errors-store';
import NewThing from './new-thing.jsx';

const NewModalStyles = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.50)'
  },
  content: {
    background: 'white',
    padding: 0,
    margin: 'auto',
    maxWidth: 1000
  }
};

export default class _Index extends React.Component {
  constructor(props) {
    super(props);
  }

  defaultState() {
    return {
      newModalOpen: false,
      fetching: true
    };
  }

  newModalStyles(height) {
    let content = NewModalStyles.content;
    content.height = height;
    return {
      overlay: NewModalStyles.overlay,
      content: content
    };
  }

  closeModal() {
    this.setState({
      newModalOpen: false
    });
  }

  renderModal(entity, obj) {
    return(
      <Modal isOpen={ this.state.newModalOpen } onRequestClose={ this.closeModal.bind(this) } contentLabel="Modal" style={ this.newModalStyles(432) }>
        <NewThing entity={ entity } initialObject={ obj } />
      </Modal>
    );
  }

  componentDidUpdate() {
    // $('.match-height-layout').matchHeight();
  }
}
