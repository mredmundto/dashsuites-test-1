import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import _ from 'lodash';
import constants from '../../../constants';
import { Actions } from 'react-native-router-flux';
import HOC from '../../HOC';
import applyHeader from '../../HOC/applyHeader';
import IssueList from '../ReviewList/IssueList';

class RoomDetail extends Component {
  constructor(props) {
    super(props);
    this.writeReview = this.writeReview.bind(this);
  }
  writeReview() {
    // Actions()
    // Actions.RoomCreate();
  }
  render() {
    const roomIndex = this.props.data.split(' ')[0];
    const room = this.props.roomList.get(roomIndex).toJS();

    console.log('in room item', this.props.data);
    console.log('thats the props here', this.props);
    console.log('this is the room here', room);

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {!room ?
            <Text style={styles.welcome}> please select a room</Text>
          : null}
          <View>
            {_.map(room, (value, key) => {
              if (typeof value === 'string') {
                return <Text style={styles.content} key={key}> {key} : {value} </Text>;
              }
            })}
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              marginTop: 30,
              marginHorizontal: 20,
              elevation: 10,
              backgroundColor: _.get(constants, 'style.secondaryColor', 'green'),
            }}
            onPress={() => {
              Actions.ReviewCreate(roomIndex);
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>{'Write Review'}</Text>
          </TouchableOpacity>

          <IssueList data={review.issueList} editable={false} source={source} roomList={roomList} style={{ flex: 1 }} />

        </ScrollView>
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

function mapStateToProps(store) {
  return {
    source: store.list,
    roomList: store.list.get('data'),
  };
}

RoomDetail.defaultProps = {
  data: '',
};
RoomDetail.propTypes = {
  data: PropTypes.string,
  roomList: PropTypes.object,
};
const composedRoomDetail = HOC(RoomDetail, [applyHeader]);
const connectedRoomDetail = connect(mapStateToProps)(composedRoomDetail);
export default connectedRoomDetail;
