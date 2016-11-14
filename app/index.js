import React, { Component, PropTypes } from 'react';
import RoomList from './components/Rooms';
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
          sceneStyle={{ paddingTop: 54 }/* this is the spacing for the menu bar on the top */}
          drawer={this.drawer}
          toggleDrawer={this.toggleDrawer}
          navBar={(props) => (
            <Header {...props} onLeft={() => toggleDrawer(true)} />
          )}
        >
          <Scene
            initial
            key="RoomList"
            component={RoomList}
            title="Rooms"
          />
          <Scene
            key="ReviewList"
            component={RoomList}
            title="Reviews"
          />
        </Router>
      </Drawer>
    );
    // <Scene key="Item" component={Item} title="Room Details" />
    // <Scene key="Create" component={Create} title="Create New Room" />
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
