import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Text,
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

import Action from './../List/action';
import IssueList from './IssueList';

const {
  Input,
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
    // this.props.addIssue(this.state, 0, 0);
  }

  render() {
    const {
      data,
      source,
      roomList,
      edit,
    } = this.props;
    // if only one date that is in create
    // if there are date and reviewList => that is in edit

    const roomIndex = data.split(' ')[0];
    const room = roomList.get(roomIndex).toJS();
    const review = roomList.getIn(data.split(' ')).toJS();


    return (
      <View style={styles.container}>
        <ScrollView style={styles.insideContainer}>
          <Input
            headerText="Room"
            editable={false}
            placeholder={room.name}
          />
          <DropDownAndroid
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
            headerText="Condition"
          />
          <IssueList source={source} data={review.issueList || []} roomList={roomList} editable addIssue={() => { Actions.IssueCreate(data); }} />
        </ScrollView>

        <TouchableOpacity
          style={styles.bottom} onPress={() => { Actions.ReviewList(); }}
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

CreateReview.propTypes = {
  addRoom: PropTypes.func,
  rooms: PropTypes.array,
};

function mapStateToProps(store) {
  return {
    source: store.list,
    roomList: store.list.get('data'),
  };
}

function mapDispatchToProps(dispatch) {
  // to be updated with the new action
  return {
    // addIssue: (newIssue, roomIndex, reviewIndex) => {
    //   return dispatch(Action.addIssue(newIssue, roomIndex, reviewIndex));
    // },
  };
}


const composedCreateReview = HOC(CreateReview, [applyHeader]);
const connectedCreateReview = connect(mapStateToProps, mapDispatchToProps)(composedCreateReview);
export default connectedCreateReview;
