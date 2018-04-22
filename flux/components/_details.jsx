import React from 'react';
import Modal from 'react-modal';
import HandyTools from 'handy-tools';
import ClientActions from '../actions/client-actions.js';
import ErrorsStore from '../stores/errors-store';

const ConfirmDeleteModalStyles = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.50)'
  },
  content: {
    background: '#FFFFFF',
    margin: 'auto',
    maxWidth: 500,
    height: 217,
    border: 'solid 1px #013ADF',
    borderRadius: '6px',
    textAlign: 'center',
    color: '#5F5F5F',
    padding: '26px 20px'
  }
};

export default class _Form extends React.Component {
  constructor(props) {
    super(props);
  }

  defaultState() {
    return {
      changesToSave: false,
      deleteModalOpen: false,
      errors: [],
      fetching: true,
      justSaved: false
    };
  }

  getErrors() {
    this.setState({
      fetching: false,
      errors: ErrorsStore.all()
    });
    console.log(ErrorsStore.all());
  }

  clickSave() {
    this.setState({
      fetching: true,
      justSaved: true
    });
    ClientActions.updateEvent(this.state.event);
  }

  clickDelete() {
    this.setState({
      deleteModalOpen: true
    });
  }

  closeModal() {
    this.setState({
      partialModalOpen: false,
      cloningModalOpen: false,
      reusableImagesModalOpen: false,
      deleteModalOpen: false
    });
  }

  renderButtons() {
    if (this.state.changesToSave) {
      var buttonText = "Save";
    } else {
      var buttonText = this.state.justSaved ? "Saved" : "No Changes";
    }
    return(
      <div>
        <a className={ "btn save-button" + HandyTools.renderDisabledButtonClass(this.state.fetching || !this.state.changesToSave) } onClick={ this.clickSave.bind(this) }>
          { buttonText }
        </a>
        <a className={ "btn delete-button " + HandyTools.renderDisabledButtonClass(this.state.fetching) } onClick={ this.clickDelete.bind(this) }>
          Delete
        </a>
      </div>
    );
  }

  renderFieldError(stateErrors, fieldErrors) {
    for (i = 0; i < fieldErrors.length; i++) {
      if (stateErrors.indexOf(fieldErrors[i]) > -1) {
        return(
          <div className="yesFieldError">{ fieldErrors[i] }</div>
        );
      }
    }
    return(
      <div className="noFieldError"></div>
    );
  }

  renderModal(entity) {
    return(
      <Modal isOpen={ this.state.deleteModalOpen } onRequestClose={ this.closeModal.bind(this) } contentLabel="Modal" style={ ConfirmDeleteModalStyles }>
        <div className="admin-modal">
          <div className="confirm-delete">
            <h1>Are you sure you want to permanently delete this { entity }&#63;</h1>
            <a className="btn" onClick={ this.confirmDelete.bind(this) }>
              Yes
            </a>
            <a className="btn" onClick={ this.closeModal.bind(this) }>
              No
            </a>
          </div>
        </div>
      </Modal>
    );
  }

  componentDidUpdate() {
    // $('.match-height-layout').matchHeight();
  }
}
