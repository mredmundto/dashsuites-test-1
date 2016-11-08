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
