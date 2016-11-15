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
import Action from './action';

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
    Actions.RoomCreate();
  }

  selectRoom(selectedRoom) {
    this.props.selectRoom(selectedRoom);
    Actions.RoomView();
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
            onLeft: () => {
              toggleDrawer(true);
            },
          }}
          data={() => {
            return this.props.rooms;
          }}
          onItemPress={this.selectRoom}
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
};

function mapStateToProps(store) {
  return {
    rooms: store.roomList.rooms,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectRoom: (selectedRoom) => {
      dispatch(Action.selectRoom(selectedRoom));
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