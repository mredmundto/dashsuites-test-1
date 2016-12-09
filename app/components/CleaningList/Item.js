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


class CleaningItem extends Component {

  render() {
    const room = this.props.room;
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
    room: store.list.toJS().selectedRoom,
  };
}

CleaningItem.defaultProps = {
  data: '',
};
CleaningItem.propTypes = {
  data: PropTypes.string,
  roomList: PropTypes.object,
};
const composedCleaningItem = HOC(CleaningItem, [applyHeader]);
const connectedCleaningItem = connect(mapStateToProps)(composedCleaningItem);
export default connectedCleaningItem;
