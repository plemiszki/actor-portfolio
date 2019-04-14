let TabActions = {

  EventsCompleted() {
    if (this.state.entitiesCompleted.length == 0) {
      this.setState({
        tab: 'completed',
        fetching: true
      }, () => {
        this.props.fetchEntities('events_past', 'events').then(() => {
          this.setState({
            fetching: false,
            entitiesCompleted: this.props.entities
          });
        });
      });
    } else {
      this.setState({
        tab: 'completed'
      });
    }
  },

  EventsUpcoming() {
    this.setState({
      tab: 'upcoming'
    });
  }
}

export default TabActions;
