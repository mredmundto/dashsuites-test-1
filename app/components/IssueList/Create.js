import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Elements from '../../../composeComponents/Form/Elements';
import applyHeader from '../../../app/HOC/applyHeader';
import HOC from '../../../app/HOC';
// importing the constants for theme
import constants from '../../../constants';

import Action from './../ReviewList/action';

const {
  Input,
  PhotoUploadAndroid,
  Switch,
  DropDownAndroid,
} = Elements;


const window = Dimensions.get('window');

class CreateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flagged: false,
      issue: true,
      imageArr: [],
      title: null,
      createdAt: new Date().toString(),
      category: null || 'cleaning', // to be set as some default values
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.addIssueForNewReview(this.state);
    Actions.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.insideContainer}>
          <Switch
            headerText="Flagged"
            value={this.state.flagged}
            onValueChange={(flagged) => { this.setState({ flagged }); }}
          />

          <Switch
            headerText="Issue Solved"
            value={this.state.issue}
            onValueChange={(issue) => { this.setState({ issue }); }}
          />

          <DropDownAndroid
            headerText="Category"
            options={[
              { value: 'Cleaning', label: 'Cleaning' },
              { value: 'Maintenance', label: 'Maintenance' },
              { value: 'Guest Services', label: 'Guest Services' },
            ]}
            onValueChange={(category) => { this.setState({ category }); }}
          />

          <Input
            headerText="Add title"
            placeholder="Enter here"
            multiline={false}
            numberOfLines={1}
            maxLength={120}
            onChangeText={(title) => { this.setState({ title }); }}
            constants={constants}
          />

          <PhotoUploadAndroid
            headerText="Add Photos"
            successCallback={(newImage) => { this.setState({ imageArr: [...this.state.imageArr, newImage] }); }}
          />
        </ScrollView>

        <TouchableOpacity
          style={styles.bottom} onPress={() => this.onClick()}
        >
          <Text style={styles.bottomText} > SAVE </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  insideContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  },
  bottom: {
    height: 50,
    width: window.width,
    backgroundColor: '#009688',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
  bottomText: {
    color: 'white',
  },
});

CreateList.propTypes = {
  addIssueForNewReview: PropTypes.func,
};

function mapStateToProps(state) {
  // to be updated
  return {
    // rooms: state.rooms,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addIssueForNewReview: (newIssue) => {
      return dispatch(Action.addIssueForNewReview(newIssue));
    },
  };
}


const composedCreateList = HOC(CreateList, [applyHeader]);
const connectedCreateList = connect(mapStateToProps, mapDispatchToProps)(composedCreateList);
export default connectedCreateList;
