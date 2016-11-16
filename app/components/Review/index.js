import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ResourceList from '../../../composeComponents/ResourceList';

class ReviewList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };
  }
  render() {
    const {
      toggleDrawer,
    } = this.props;
    return (
      <ResourceList
        headerProps={{
          onLeft: () => {
            toggleDrawer(true);
          },
          onRight: () => {
            this.setState({ modalOpen: true });
          },
        }}
        searchModalOpen={this.state.modalOpen}
        onSearchClose={() => {
          this.setState({ modalOpen: false });
        }}
        onSearchModalRequestClose={() => {
          this.setState({ modalOpen: false });
        }}
      />
    );
  }
}

ReviewList.defaultProps = {
  allowCreate: true,
  rooms: [],
  infiniteScroll: true,
};

ReviewList.propTypes = {
  toggleDrawer: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawer: (open) => {
      return dispatch({
        type: 'TOGGLE_DRAWER',
        open,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(ReviewList);
