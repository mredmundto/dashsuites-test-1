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
import { addReview } from './action';
import { bindActionCreators } from 'redux';
import Elements from '../../../../composeComponents/Form/Elements';

// importing the constants for theme
import constants from '../../../../constants';

const {
  Input,
} = Elements;

class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: this.props.activeRoom.number,
      time: Date.now(),
      rating: '',
    };
  }

  onClick() {
    this.props.addReview(this.state);
    Actions.pop(); 
  }

  render() {
    return (
      <View>
        <Text> new review for room {this.props.activeRoom.number} </Text>
       
        <Input
          headerText="Rating"
          placeholder="Please enter the rating for this room"
          //maxLength={1}
          onChangeText={(rating) => { this.setState({ rating })}}
          constants={constants}
        />

        <TouchableOpacity onPress={() => this.onClick()}>
          <Text style={styles.content}> Submit the review </Text>
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
    activeRoom: state.activeRoom,
    reviews: state.reviews,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addReview: addReview }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReview);
