import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { selectRoom } from './action';
import { Actions } from 'react-native-router-flux';

class App extends Component {

  onClick(room) {
    this.props.selectRoom(room);
    // routing to view one item
    Actions.ItemRoom();
  }

  addItem(){
    Actions.CreateRoom();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Please select a room
        </Text>

        {this.props.rooms.map(room => {
          return (
            <TouchableOpacity key={room.number} onPress={ () => this.onClick(room) }>
            <Text style={styles.content} key={room.number}> Room Number: {room.number} </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity style={styles.addButton}onPress={ ()=> this.addItem()}>
          <Text style={styles.addButtonText}> + </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 25,
    margin: 5,
  },
  content: {
    fontSize: 20,
    margin: 5,
  },
  addButtonText: {
    fontSize: 35,
    color: 'white',
  },
  addButton: {
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
});

function mapStateToProps(state) {
  return {
    rooms: state.rooms,
    activeRoom: state.activeRoom,
    reviews: state.reviews,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectRoom : selectRoom }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
