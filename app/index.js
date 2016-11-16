import React, { Component, PropTypes } from 'react';
import RoomList from './components/Rooms';
import ReviewList from './components/Review';
import {
  Scene,
  // Router,
} from 'react-native-router-flux';
import Drawer from './components/Drawer';
import Router from './components/Router';
import Header from './components/Header';
import { connect } from 'react-redux';
// import _ from 'lodash';

class App extends Component {
  render() {
    const {
      toggleDrawer,
    } = this.props;
    return (
      <Drawer>
        <Router
          drawer={this.drawer}
          toggleDrawer={this.toggleDrawer}
          hideNavBar
        >
          <Scene
            key="RoomList"
            component={RoomList}
            title="Rooms"
          />
          <Scene
            initial
            key="ReviewList"
            component={ReviewList}
            title="Reviews"
          />
        </Router>
      </Drawer>
    );
  }
}

App.propTypes = {
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

export default connect(null, mapDispatchToProps)(App);
