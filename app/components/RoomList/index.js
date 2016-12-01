import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import allList from '../../../composeComponents/ResourceList';
import Action from './../List/action';

const ResourceList = allList.composedList;

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

  // componentWillMount() {
  //   // define in global
  //   customFetch('http://127.0.0.1:3000/REST/room', {
  //     method: 'GET',
  //   })
  //   .then((resJSON) => {
  //     this.props.loadRoom(resJSON);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  // }

  addItem() {
    console.log('clicked add room');
    Actions.RoomEdit();
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
  loadRoom: PropTypes.func,
};

function mapStateToProps(store) {
  const data = store.list.toJS(); 
  // console.log('store in room', store.list.toJS());
  return {
    rooms: data.room,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectRoom: (selectedRoom) => {
      dispatch(Action.selectRoom(selectedRoom));
    },
    // loadRoom: (initObj) => {
    //   dispatch(Action.loadRoom(initObj));
    // },
    toggleDrawer: (open) => {
      dispatch({
        type: 'TOGGLE_DRAWER',
        open,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
