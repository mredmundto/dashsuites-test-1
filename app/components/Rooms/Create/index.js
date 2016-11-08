import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text,
  TextInput,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { addRoom } from './action';
import { bindActionCreators } from 'redux';

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      location: '',
      price: '',
    };
  }

  _onClick() {
    this.props.addRoom(this.state);
    Actions.pop({ refresh: { rooms: this.props.rooms } });
  }

  render() {
    return (
      <View>
        <Text> Create room page</Text>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter Room Number here'
          onChangeText={(number) => this.setState({number})}
          value={this.state.number}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter Location here'
          onChangeText={(location) => this.setState({location})}
          value={this.state.location}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter Price here'
          onChangeText={(price) => this.setState({price})}
          value={this.state.price}
        />

        <TouchableHighlight onPress={() => this._onClick()}>
          <Text> SAVE </Text>
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

});

function mapStateToProps(state) {
  return {
    rooms: state.rooms
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addRoom: addRoom }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);
