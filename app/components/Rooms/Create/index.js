import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { addRoom } from './action';
import { bindActionCreators } from 'redux';
import Elements from '../../../../composeComponents/Form/Elements';

// importing the constants for theme
import constants from '../../../../constants';

console.log('constants in create', constants);

const {
  Input,
} = Elements;

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      location: '',
      price: '',
    };
  }

  onClick() {
    console.log('in create and index', this.state);
    this.props.addRoom(this.state);
    Actions.pop({ refresh: { rooms: this.props.rooms } });
  }

  render() {
    return (
      <View>
        <Text> Create room page</Text>

        <Input
          headerText="Room Number"
          placeholder="Enter Room Number here"
          maxLength={10}
          onChangeText={(number) => { this.setState({ number })}}
          constants={constants}
        />

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter Location here'
          onChangeText={(location) => this.setState({location})}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter Price here'
          onChangeText={(price) => this.setState({price})}
        />

        <TouchableOpacity onPress={() => this.onClick()}>
          <Text> SAVE </Text>
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
