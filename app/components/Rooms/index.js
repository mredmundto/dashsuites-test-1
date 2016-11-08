import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { selectRoom } from './action';
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectRoom : selectRoom }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
