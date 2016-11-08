import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text,
  View,
  StyleSheet,
} from 'react-native';
import _ from 'lodash';

class CreateRoom extends Component {

  render() {
    return (
      <View>
        <Text> This is Edit page</Text>
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
    activeRoom: state.activeRoom,
  };
}

export default connect(mapStateToProps)(CreateRoom);
