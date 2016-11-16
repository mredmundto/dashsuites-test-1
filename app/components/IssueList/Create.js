import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Elements from '../../../composeComponents/Form/Elements';

import applyHeader from '../../../app/HOC/applyHeader';
import HOC from '../../../app/HOC';
// importing the constants for theme
import constants from '../../../constants';

import Action from './../List/action';

const {
  Input,
  PhotoUploadAndroid,
  Switch,
  DropDownAndroid,
} = Elements;

console.log('PhotoUploadAndroid', PhotoUploadAndroid);

class CreateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false, 
      issue: true,
      imageArr: [],
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log('in create and index', this.state);
    //this.props.addRoom(this.state);
    //Actions.pop({ refresh: { rooms: this.props.rooms } });
    //Actions.RoomView();
  }

  render() {
    console.log('this state in render', this.state);
    return (
       <View style={styles.container}>
        
        <Switch
          headerText="Flagged"
          value={this.state.flag}
          onValueChange={(flag) => { this.setState({ flag }); }}
        />        

        <Switch
          headerText="Issue Solved"
          value={this.state.issue}
          onValueChange={(issue) => { this.setState({ issue }); }}
        />

        <Input
          headerText="Add Description"
          placeholder="Enter here"
          maxLength={120}
          onChangeText={(number) => { this.setState({ number }); }}
          constants={constants}
        />

      {/* DropDownAndroid to be completed*/}
        <DropDownAndroid
          headerText="Category"
        />

        <PhotoUploadAndroid
          headerText="Add Photos"
          successCallback={(newImage) => { this.setState({ imageArr: [...this.state.imageArr, newImage] }); }}
        />

        <TouchableOpacity 
        style={styles.bottom} onPress={() => this.onClick()}>
          <Text style={styles.bottomText} > SAVE </Text>
        </TouchableOpacity>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column'
  },
  bottom: {
    height: 50,
    width: 360, // to be edited
    backgroundColor: '#009688',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  bottomText: {
    color: 'white'
  }
});

CreateList.propTypes = {
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
      return dispatch(Action.addItem(newRoom, 'rooms'));
    },
  };
}


const composedCreateList = HOC(CreateList, [applyHeader]);
const connectedCreateList = connect(mapStateToProps, mapDispatchToProps)(composedCreateList);
export default connectedCreateList
