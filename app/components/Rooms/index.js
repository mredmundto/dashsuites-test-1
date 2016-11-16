import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { selectRoom } from './action';
import { Actions } from 'react-native-router-flux';

class RoomList extends Component {
  addItem() {
    Actions.RoomCreate();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.rooms.map((room, i) => {
          return (
            <TouchableOpacity key={i}>
              <Text
                style={styles.content}
              >
                {room.number}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => this.addItem()}
        >
          <Image source={require('../../resources/images/plus@3x.png')} />
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
  allowCreate: PropTypes.bool,
  rooms: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
  ]),
  infiniteScroll: PropTypes.bool,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

function mapStateToProps(state) {
  return {
    rooms: state.rooms,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectRoom : selectRoom }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
