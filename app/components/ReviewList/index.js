import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ResourceList from '../../../composeComponents/ResourceList';

class ReviewList extends Component {
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
