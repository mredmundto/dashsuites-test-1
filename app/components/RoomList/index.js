import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import ResourceList from '../../../composeComponents/ResourceList';
import Action from './../List/action';

const displayedInList = ['name', 'building', 'community'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  content: {
    fontSize: 20,
    margin: 5,
  },
  addButton: {
    elevation: 5,
    backgroundColor: '#1976d2',
    height: 65,
    width: 65,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButtonText: {
    fontSize: 35,
    color: 'white',
  },
});

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.selectRoom = this.selectRoom.bind(this);
  }

  addItem() {
    // This is seeding data into DB, will move server side
    fetch('http://127.0.0.1:3000/REST/room', {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Fake seed data from client',
        building: 'Fake data',
        address: 'Fake data',
        community: 'TST',
      }),
    })
    .then((res) => {
      return res.json();
    })
    .then((resJSON) => {
      console.log('post request to server', resJSON);
    })
    .catch((e) => {
      console.log('e', e);
      throw e;
    });
    fetch('http://127.0.0.1:3000/REST/room', {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Fake seed data from client 2',
        building: 'Fake data 2',
        address: 'Fake data 2',
        community: 'TST',
      }),
    })
    .then((res) => {
      return res.json();
    })
    .then((resJSON) => {
      console.log('post request to server', resJSON);
    })
    .catch((e) => {
      console.log('e', e);
      throw e;
    });

    fetch('http://127.0.0.1:3000/REST/room', {
      method: 'GET',
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      return res.json();
    })
    .then((resJSON) => {
      // push the fetched object from server to reducer
      this.props.initApp(resJSON);
      console.log('getting a list', resJSON);
    })
    .catch((e) => {
      console.log('e', e);
      throw e;
    });
    // Actions.RoomEdit();
  }

  selectRoom(selectedRoom, roomIndex) {
    Actions.RoomView(`${roomIndex}`);
  }

  render() {
    const {
      toggleDrawer,
    } = this.props;
    return (
      <View
        style={styles.container}
      >
        <ResourceList
          headerProps={{
            leftImage: require('../../resources/images/path@3x.png'),
            onLeft: () => {
              toggleDrawer(true);
            },
          }}
          data={this.props.rooms}
          onItemPress={this.selectRoom}
          displayedInList={displayedInList}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => this.addItem()}
        >
          <Text style={styles.addButtonText}> + </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

RoomList.defaultProps = {
  allowCreate: true,
  rooms: [],
  infiniteScroll: true,
};

RoomList.propTypes = {
  toggleDrawer: PropTypes.func,
  allowCreate: PropTypes.bool,
  rooms: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
  ]),
  infiniteScroll: PropTypes.bool,
  selectRoom: PropTypes.func,
  initApp: PropTypes.func,
};

function mapStateToProps(store) {
  const data = store.list.toJS();
  return {
    rooms: data.data,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectRoom: (selectedRoom) => {
      dispatch(Action.selectItem(selectedRoom, 'rooms'));
    },
    initApp: (initObj) => {
      dispatch(Action.initApp(initObj));
    },
    toggleDrawer: (open) => {
      dispatch({
        type: 'TOGGLE_DRAWER',
        open,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
