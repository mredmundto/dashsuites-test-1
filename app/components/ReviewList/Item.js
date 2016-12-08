/*
 * TODO POORLY COPIED FROM REVIEW CREATE. DELETE AFTER DEMO !
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  ScrollView,
  View,
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
import IssueList from './IssueList';


import Action from './../List/action';

const {
  Input,
  PhotoUploadAndroid,
  Switch,
  DropDownAndroid,
} = Elements;

const window = Dimensions.get('window');

class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      issue: true,
      imageArr: [],
      description: '',
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
  }

  render() {
    const {
      source,
      data,
      roomList,
      tempIssueList,
    } = this.props;
    const path = data.split(' ');

    const room = roomList.get(path[0]).toJS();
    const review = roomList.getIn(path).toJS();
    return (
      <View style={{ flex: 1 }}>

        <ScrollView style={styles.insideContainer}>
          <Input
            headerText="Room"
            editable={false}
            placeholder={room.name}
          />
          <DropDownAndroid
            enabled={false}
            headerText="Community"
            options={[
              {
                value: room.community,
                label: room.community,
              },

              ...[
                {
                  value: 'TST',
                  label: 'TST',
                },
                {
                  value: 'Causeway Bay 1',
                  label: 'Causeway Bay 1',
                },
                {
                  value: 'Causeway Bay 2',
                  label: 'Causeway Bay 2',
                },
                {
                  value: 'Wan Chai',
                  label: 'Wan Chai',
                },
              ].filter((option) => option.value !== room.community),
            ]}
          />
          <Input
            headerText="Last Cleaning Date"
            editable={false}
            placeholder={String(new Date())}
          />

          <DropDownAndroid
            enabled={false}
            headerText="Condition"
          />
          <IssueList data={tempIssueList} editable={false} source={source} roomList={roomList} style={{ flex: 1 }} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  insideContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    paddingBottom: 100,
  },
  bottomText: {
    color: 'white',
  },
});

CreateReview.propTypes = {
  addRoom: PropTypes.func,
  rooms: PropTypes.array,
};

function mapStateToProps(store) {
  return {
    source: store.list,
    roomList: store.list.get('data'),
    tempIssueList: store.list.tempIssueList.toJS(), 
  };
}

function mapDispatchToProps(dispatch) {
  // to be updated with the new action
  return {
    addIssue: (newIssue, roomIndex, reviewIndex) => {
      return dispatch(Action.addIssue(newIssue, roomIndex, reviewIndex));
    },
  };
}


const composedCreateReview = HOC(CreateReview, [applyHeader]);
const connectedCreateReview = connect(mapStateToProps, mapDispatchToProps)(composedCreateReview);
export default connectedCreateReview;
