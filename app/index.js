import React, { Component, PropTypes } from 'react';
import RoomList from './components/RoomList';
import RoomCreate from './components/RoomList/Create';
import RoomItem from './components/RoomList/Item';
import {
  Dimensions,
} from 'react-native';
import ReviewCreate from './components/ReviewList/Create';
import ReviewList from './components/ReviewList';
import ReviewItem from './components/ReviewList/Item';
import IssueCreate from './components/IssueList/Create';
import {
  Scene,
  // Router,
  Actions,
} from 'react-native-router-flux';
import Drawer from './components/Drawer';
import Router from './components/Router';
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
            initial
            key="RoomList"
            component={RoomList}
            title="Rooms"
          />
          <Scene
            key="RoomView"
            component={(props) => {
              return (
                <RoomItem
                  {...props}
                  headerProps={{
                    onRight: () => {
                      console.log('right from view ');
                      Actions.RoomEdit(props.data);
                    },
                    rightTitle: 'Edit',
                  }}
                />
              );
            }}
            title="Room"
          />
          <Scene
            key="RoomEdit"
            component={(props) => <RoomCreate {...props} edit />}
            title="Room"
          />
          <Scene
            key="ReviewList"
            component={ReviewList}
            title="Reviews"
          />

          <Scene
          
            key="ReviewView"
            component={(props) => {
              return (
                <ReviewItem
                  {...props}
                  headerProps={{
                    onRight: () => {
                      console.log('right from view ');
                      Actions.ReviewEdit(props.data);
                    },
                    rightTitle: 'Edit',
                  }}
                />
              );
            }}
            title="Review"
          />

          <Scene
            key="ReviewCreate"
            component={ReviewCreate}
            title="Reviews"
          />

          <Scene
            key="ReviewEdit"
            component={(props) => <ReviewCreate {...props} edit />}
            title="Reviews"
          />

          <Scene
            key="IssueCreate"
            component={IssueCreate}
            title="Create an issue"
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
