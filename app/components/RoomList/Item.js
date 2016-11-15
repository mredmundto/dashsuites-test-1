import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Text,
  View,
  StyleSheet,
} from 'react-native';
import _ from 'lodash';

class RoomDetail extends Component {

  render() {
    return (!this.props.activeRoom) ? (
      <View>
        <Text style={styles.welcome}> please select a room</Text>
      </View>
    ) : (
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

function mapStateToProps(store) {
  return {
    activeRoom: store.roomList.activeRoom,
  };
}

RoomDetail.propTypes = {
  activeRoom: PropTypes.object,
};

export default connect(mapStateToProps)(RoomDetail);
