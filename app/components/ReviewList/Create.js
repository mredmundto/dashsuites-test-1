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
import Action from './action';
import IssueList from './../IssueList/IssueList';
import constants from '../../../constants';

const {
  Input,
} = Elements;

const window = Dimensions.get('window');

class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.selectRoomId(this.props.selectedRoom.id);
  }

  onClick() {
    const promiseChain = Promise.resolve();
    promiseChain
    .then(() => {
      return customFetch(`${constants.config.url}/API/review`, {
        method: 'POST',
        body: {
          roomId: this.props.selectedRoomId,
          createdAt: new Date(),
          issueList: JSON.stringify(this.props.issueList),
        },
      });
    })
    .then(() => {
      this.props.clearTempIssue();
    })
    .then(() => {
      return Actions.ReviewList();
    });
  }

  render() {
    const {
      selectedRoom,
      issueList,
    } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.insideContainer}>
          <Input
            headerText="Room"
            editable={false}
            placeholder={selectedRoom.name}
          />
          <IssueList
            data={issueList || []}
            editable addIssue={() => { Actions.IssueCreate(); }}
          />
        </ScrollView>
        <TouchableOpacity
          style={styles.bottom} onPress={() => { this.onClick(); }}
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
  clearTempIssue: PropTypes.func,
  issueList: PropTypes.array,
  selectRoomId: PropTypes.func,
  selectedRoom: PropTypes.object,
  selectedRoomId: PropTypes.number,
};

function mapStateToProps(store) {
  return {
    selectedRoom: store.room.toJS().selectedRoom,
    issueList: store.review.toJS().tempIssueList,
    selectedRoomId: store.review.toJS().selectedRoomId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectRoomId: (id) => {
      return dispatch(Action.selectRoomId(id));
    },
    clearTempIssue: () => {
      return dispatch(Action.clearTempIssue());
    },
  };
}


const composedCreateReview = HOC(CreateReview, [applyHeader]);
const connectedCreateReview = connect(mapStateToProps, mapDispatchToProps)(composedCreateReview);
export default connectedCreateReview;
