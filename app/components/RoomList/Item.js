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
    const room = this.props.roomList.find((r) => r.get('name') === this.props.data).toJS();
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
              Actions.ReviewCreate(room.name);
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>{'Write Review'}</Text>
          </TouchableOpacity>
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

export default connect(mapStateToProps)(RoomDetail);
