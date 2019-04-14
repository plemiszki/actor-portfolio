import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from 'react-modal'
import HandyTools from 'handy-tools'
import { Common, Details, ModalSelect, ModalSelectStyles } from 'handy-components'
import { fetchEntity, createEntity, updateEntity, deleteEntity } from '../actions/index'

class EventDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      event: {},
      eventSaved: {},
      errors: [],
    };
  }

  componentDidMount() {
    this.props.fetchEntity({
      id: window.location.pathname.split('/')[3],
      directory: window.location.pathname.split('/')[2],
      entityName: 'event'
    }).then(() => {
      this.setState({
        fetching: false,
        event: this.props.event,
        eventSaved: HandyTools.deepCopy(this.props.event),
        tags: this.props.tags,
        eventTags: this.props.eventTags,
        changesToSave: false
      }, () => {
        HandyTools.setUpNiceSelect({ selector: 'select', func: Details.changeField.bind(this, this.changeFieldArgs()) });
      });
    });
  }

  changeFieldArgs() {
    return {
      allErrors: Errors,
      errorsArray: this.state.errors,
      changesFunction: this.checkForChanges.bind(this)
    }
  }

  checkForChanges() {
    return !HandyTools.objectsAreEqual(this.state.event, this.state.eventSaved);
  }

  clickSave() {
    this.setState({
      fetching: true,
      justSaved: true
    }, function() {
      this.props.updateEntity({
        id: window.location.pathname.split('/')[3],
        directory: window.location.pathname.split('/')[2],
        entity: this.state.event,
        entityName: 'event'
      }).then(() => {
        this.setState({
          fetching: false,
          event: this.props.event,
          eventSaved: HandyTools.deepCopy(this.props.event),
          changesToSave: false
        });
      }, () => {
        this.setState({
          fetching: false,
          errors: this.props.errors
        });
      });
    });
  }

  render() {
    return(
      <div className="event-details component">
        <h1>Event Details</h1>
        <div className="white-box">
          { Common.renderSpinner(this.state.fetching) }
          { Common.renderGrayedOut(this.state.fetching, -36, -32, 5) }
          <div className="row">
            { Details.renderField.bind(this)({ columnWidth: 3, entity: 'event', property: 'time' }) }
            { Details.renderField.bind(this)({ columnWidth: 9, entity: 'event', property: 'title' }) }
          </div>
          <div className="row">
            { Details.renderTextBox.bind(this)({ rows: 10, columnWidth: 12, entity: 'event', property: 'text' }) }
          </div>
          <div>
            <a className={ "btn standard-width" + Common.renderDisabledButtonClass(this.state.fetching || !this.state.changesToSave) } onClick={ this.clickSave.bind(this) }>
              { Details.saveButtonText.call(this) }
            </a>
            <a className={ "btn delete-button" + Common.renderDisabledButtonClass(this.state.fetching) } onClick={ Details.clickDelete.bind(this) }>
              Delete
            </a>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (reducers) => {
  return {
    event: reducers.standardReducer.entity,
    errors: reducers.standardReducer.errors
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEntity, updateEntity, deleteEntity }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
