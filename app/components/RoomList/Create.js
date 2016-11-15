import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Elements from '../../../composeComponents/Form/Elements';

// importing the constants for theme
import constants from '../../../constants';

import Action from './action';

const {
  Input,
  PhotoUploadAndroid,
  DropDown
} = Elements;

console.log('PhotoUploadAndroid', PhotoUploadAndroid);

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      location: '',
      price: '',
      imageArr: [],
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log('in create and index', this.state);
    this.props.addRoom(this.state);
    Actions.pop({ refresh: { rooms: this.props.rooms } });
  }

  render() {
    console.log('this state in render', this.state);
    return (
       <View>
        <Text> Create room page </Text>

        <Input
          headerText="Room Number"
          placeholder="Enter Room Number here"
          maxLength={10}
          onChangeText={(number) => { this.setState({ number }); }}
          constants={constants}
        />

        <Input
          headerText="Location"
          placeholder="Enter Location here"
          maxLength={50}
          onChangeText={(location) => { this.setState({ location }); }}
          constants={constants}
        />

        <Input
          headerText="Price"
          placeholder="Enter price per night in HKD"
          maxLength={4}
          onChangeText={(price) => { this.setState({ price }); }}
          constants={constants}
        />
        <DropDown/>

        <PhotoUploadAndroid
          headerText="Add Photos"
          successCallback={(newImage) => { this.setState({ imageArr: [...this.state.imageArr, newImage] }); }}
        />

        <TouchableOpacity onPress={() => this.onClick()}>
          <Text style={styles.content}> SAVE </Text>
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

CreateRoom.propTypes = {
  addRoom: PropTypes.func,
  rooms: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    rooms: state.rooms,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addRoom: (newRoom) => {
      return dispatch(Action.addRoom(newRoom));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom);
