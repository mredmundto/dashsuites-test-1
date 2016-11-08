import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text,
  TextInput,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import _ from 'lodash';

class CreateRoom extends Component {
  constructor(props){
    super(props);
    this.state = {
      number: 'Please enter the room name',
      location: 'Please enter the room location',
      price: 'Please enter the price',
    };
  }

  _onClick(){
    console.log(this.state);
  }

  render() {
    return (
      <View>
        <Text> Create room page</Text>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(number) => this.setState({number})}
          value={this.state.number}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(location) => this.setState({location})}
          value={this.state.location}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(price) => this.setState({price})}
          value={this.state.price}
        />

        <TouchableHighlight onPress={ ()=> this._onClick()}>
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
    activeRoom: state.activeRoom,
  };
}

export default connect(mapStateToProps)(CreateRoom);
