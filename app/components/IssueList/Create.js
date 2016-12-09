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
      create: false,
      flagged: false,
      issue: true,
      imageArr: [],
      title: '',
      createdAt: new Date().toString(),
      category: null || 'Cleaning', // to be set as some default values
      description: null,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.state.create) {
      this.props.addIssueForNewReview(this.state);
    } else {
      this.props.updateIssueForNewReview(this.state, this.props.issueId);
    }
    Actions.pop();
  }

  // componentWillMount() {
  // }
  componentWillMount() {
    if (this.props.issue === undefined) {
      this.setState({ create: true });
    } else {
      this.setState({
        issue: this.props.issue.issue,
        title: this.props.issue.title,
        flagged: this.props.issue.flagged,
        description: this.props.issue.description,
        category: this.props.issue.category,
        imageArr: this.props.issue.imageArr,
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        {this.state.create ?
          <View
            style={styles.container}
          >
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
                value={this.state.category}
                onValueChange={(category) => { this.setState({ category }); }}
              />

              <Input
                headerText="Add title"
                placeholder="Enter here"
                multiline={false}
                numberOfLines={1}
                maxLength={120}
                value={this.state.title}
                onChangeText={(title) => { this.setState({ title }); }}
                constants={constants}
              />

              <Input
                headerText="Add Description"
                placeholder="Enter here"
                multiline={true}
                numberOfLines={3}
                maxLength={120}
                value={this.state.description}
                onChangeText={(description) => { this.setState({ description }); }}
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
          :           
          <View
            style={styles.container}
          >
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
                { value: this.state.category, label: this.state.category },
                  ...[
                  { value: 'Cleaning', label: 'Cleaning' },
                  { value: 'Maintenance', label: 'Maintenance' },
                  { value: 'Guest Services', label: 'Guest Services' },
                  ].filter((option) => option.value !== this.state.category),
                ]}
                value={this.state.category}
                onValueChange={(category) => { this.setState({ category }); }}
              />

              <Input
                headerText="Add title"
                placeholder="Enter here"
                multiline={false}
                numberOfLines={1}
                maxLength={120}
                value={this.state.title}
                onChangeText={(title) => { this.setState({ title }); }}
                constants={constants}
              />

              <Input
                headerText="Add Description"
                placeholder="Enter here"
                multiline={true}
                numberOfLines={3}
                maxLength={120}
                value={this.state.description}
                onChangeText={(description) => { this.setState({ description }); }}
                constants={constants}
              />

              <PhotoUploadAndroid
                headerText="Add Photos"
                successCallback={(newImage) => { this.setState({ imageArr: [...this.state.imageArr, newImage] }); }}
                imageArr={this.state.imageArr}
              />
            </ScrollView>

            <TouchableOpacity
              style={styles.bottom} onPress={() => this.onClick()}
            >
              <Text style={styles.bottomText} > Update </Text>
            </TouchableOpacity>
          </View>
        }
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 70, // TODO hack to solve scroll bottom being clipped

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
  issue: PropTypes.object, 
};

function mapStateToProps(store) {
  // to be updated
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addIssueForNewReview: (newIssue) => {
      return dispatch(Action.addIssueForNewReview(newIssue));
    },
    updateIssueForNewReview: (updatedIssue, index) => {
      return dispatch(Action.updateIssueForNewReview(updatedIssue, index));
    },
  };
}


const composedCreateList = HOC(CreateList, [applyHeader]);
const connectedCreateList = connect(mapStateToProps, mapDispatchToProps)(composedCreateList);
export default connectedCreateList;
