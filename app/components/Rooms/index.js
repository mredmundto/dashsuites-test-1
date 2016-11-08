import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { selectRoom, addRoom } from './action';
import { Actions } from 'react-native-router-flux';

class App extends Component {

  _onClick(room) {
    this.props.selectRoom(room);
    // routing to view one item
    Actions.Item();
  }

  addItem(){
    Actions.Create();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Please select a room
        </Text>

        {this.props.rooms.map(room => {
          return (
            <TouchableHighlight key={room.number} onPress={ () => this._onClick(room) }>
            <Text style={styles.content} key={room.number}> {room.number} </Text>
            </TouchableHighlight>
          );
        })}
        <TouchableHighlight style={styles.addButton}onPress={ ()=> this.addItem()}>
          <Text style={styles.addButtonText}> + </Text>
        </TouchableHighlight>
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
    fontSize: 35
  },
  addButton: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
    borderWidth: 1,
    height: 70,
    width: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right:20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    }
  },
});

function mapStateToProps(state) {
  return {
    rooms: state.rooms,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectRoom : selectRoom }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
