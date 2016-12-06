import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { ResourceListWithHeader } from '../../../composeComponents/ResourceList';
// import Action from './../List/action';
import Action from './action';
import constants from './../../../constants';

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
    this.state = {
      searchModalOpen: false,
    };
    this.selectRoom = this.selectRoom.bind(this);
  }

  componentDidMount() {
    customFetch(`${constants.config.url}/REST/room`, {
      method: 'GET',
    })
    .then((resJSON) => {
      this.props.loadRoom(resJSON);
    })
    .catch((e) => {
      console.log(e);
    });
  }

  addItem() {
    // when going into create, clear the active room
    this.props.selectRoom({});
    Actions.RoomForm();
  }

  selectRoom(selectedRoom) {
    this.props.selectRoom(selectedRoom);
    Actions.RoomView();
  }

  render() {
    const {
      toggleDrawer,
    } = this.props;
    const {
      searchModalOpen,
    } = this.state;

    return (
      <View
        style={styles.container}
      >
        <ResourceListWithHeader
          headerProps={{
            leftImage: require('../../resources/images/path@3x.png'),
            showRight: true,
            onLeft: () => {
              toggleDrawer(true);
              this.props.deleteRoomParam('testing');
            },
            onRight: () => {
              this.props.setRoomParam('testing', 'this');
              this.setState({ searchModalOpen: true });
            },
          }}
          searchable
          searchModalOpen={searchModalOpen}
          onSearchClose={() => {
            this.setState({ searchModalOpen: false });
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
  loadRoom: PropTypes.func,
};

function mapStateToProps(store) {
  const data = store.list.toJS();

  return {
    rooms: store.room.toJS().room,
    qParams: data.roomParams,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectRoom: (selectedRoom) => {
      dispatch(Action.selectRoom(selectedRoom));
    },
    loadRoom: (initObj) => {
      dispatch(Action.loadRoom(initObj));
    },
    toggleDrawer: (open) => {
      dispatch({
        type: 'TOGGLE_DRAWER',
        open,
      });
    },
    setRoomParam: (key, value) => {
      dispatch({
        type: 'SET_ROOM_PARAM',
        key,
        value,
      });
    },
    deleteRoomParam: (key) => {
      dispatch({
        type: 'DELETE_ROOM_PARAM',
        key,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
