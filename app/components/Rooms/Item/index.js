import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text,
  View,
  StyleSheet,
} from 'react-native';
import _ from 'lodash';

class RoomDetail extends Component {

  render() {
    if (!this.props.activeRoom) {
      return (
        <View>
          <Text style={styles.welcome}> please select a room</Text>
        </View>
			);
    }

    return (
      <View>
        {_.map(this.props.activeRoom, (value, key) => {
          return <Text style={styles.content} key={key}> {key} : {value} </Text>;
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
    activeRoom: state.activeRoom,
  };
}

export default connect(mapStateToProps)(RoomDetail);
