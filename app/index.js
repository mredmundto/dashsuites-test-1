import React, { Component, PropTypes } from 'react';
import RoomList from './components/RoomList';
import RoomCreate from './components/RoomList/Create';
import RoomItem from './components/RoomList/Item';
import ReviewCreate from './components/ReviewList/Create';
import ReviewList from './components/ReviewList';
import ReviewItem from './components/ReviewList/Item';
import IssueCreate from './components/IssueList/Create';
import CleaningList from './components/CleaningList';
import CleaningItem from './components/CleaningList/Item';
import LinenList from './components/LinenList';

import {
  Scene,
  // Router,
  Actions,
} from 'react-native-router-flux';
import Drawer from './components/Drawer';
import Router from './components/Router';
import { connect } from 'react-redux';
// import _ from 'lodash';

// set customFetch to global when the app first starts
import setFetchToGlobal from './admin/global';
import Action from './components/List/action';
import constants from './../constants';

class App extends Component {

  componentWillMount() {
    customFetch(`${constants.config.url}/REST`, {
      method: 'GET',
    })
    .then((resJSON) => {
      this.props.loadSchema(resJSON);
      console.log('the whole rest API', resJSON);
    })
    .catch((e) => {
      console.log(e);
    });

    // getting all rooms
    customFetch(`${constants.config.url}/REST/room`, {
      method: 'GET',
    })
    .then((resJSON) => {
      this.props.loadRoom(resJSON);
    })
    .catch((e) => {
      console.log(e);
    });

    // getting all rooms
    customFetch(`${constants.config.url}/REST/review`, {
      method: 'GET',
    })
    .then((resJSON) => {
      this.props.loadReview(resJSON);
    })
    .catch((e) => {
      console.log(e);
    });
  }

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
          <Scene
            // initial
            key="CleaningList"
            component={(props) => {
              return (
                <CleaningList
                  {...props}
                  headerProps={{
                    leftImage: require('./resources/images/path@3x.png'),
                    onLeft: () => {
                      toggleDrawer(true);
                    },
                  }}
                />
              );
            }}
            title="My Cleaning Schedule"
          />

          <Scene
            key="CleaningItem"
            component={CleaningItem}
            title="Room Details"
          />
          <Scene
            initial
            key="LinenList"
            component={(props) => {
              return (
                <LinenList
                  {...props}
                  headerProps={{
                    leftImage: require('./resources/images/path@3x.png'),
                    onLeft: () => {
                      toggleDrawer(true);
                    },
                  }}
                />
              );
            }}
            title="My Linen Schedule"
          />

        </Router>
      </Drawer>
    );
  }
}

App.propTypes = {
  toggleDrawer: PropTypes.func,
  loadSchema: PropTypes.func,
  loadRoom: PropTypes.func,
  loadReview: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDrawer: (open) => {
      return dispatch({
        type: 'TOGGLE_DRAWER',
        open,
      });
    },
    loadRoom: (initObj) => {
      dispatch(Action.loadRoom(initObj));
    },
    loadSchema: (initObj) => {
      dispatch(Action.loadSchema(initObj));
    },
    loadReview: (initObj) => {
      dispatch(Action.loadReview(initObj));
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
