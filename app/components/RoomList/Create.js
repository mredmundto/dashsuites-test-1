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

// importing the constants for theme
import constants from '../../../constants';
import applyHeader from '../../../app/HOC/applyHeader';
import HOC from '../../../app/HOC';
import Action from './../List/action';

const {
  Input,
} = Elements;

const window = Dimensions.get('window');

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      building: '',
      community: '',
      address: '',
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log('here');
    // this.props.addRoom(this.state);
    // Actions.pop({ refresh: { rooms: this.props.rooms } });
  }

  render() {
    const {
      source,
      data,
      roomList,
    } = this.props;

    console.log('in edit page', this.props);
    // this.props.data is the index of the room
    const room = roomList.get(data).toJS();
    console.log('room in edit', room);

    return (
      <View style={styles.container}>
        <ScrollView style={styles.insideContainer}>
          <Input
            headerText="name"
            placeholder={room.name}
            onChangeText={(number) => { this.setState({ number }); }}
          />

          <Input
            headerText="building"
            placeholder={room.building}
            onChangeText={(location) => { this.setState({ location }); }}
          />

          <Input
            headerText="community"
            placeholder={room.community}
            onChangeText={(community) => { this.setState({ community }); }}
          />

          <Input
            headerText="address"
            placeholder={room.address}
            onChangeText={(address) => { this.setState({ address }); }}
          />          

        </ScrollView>

        <TouchableOpacity
          style={styles.bottom} onPress={() => { this.onClick() }}
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

CreateRoom.propTypes = {
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
  return {
    addRoom: (newRoom) => {
      return dispatch(Action.addItem(newRoom, 'rooms'));
    },
  };
}

const composedCreateRoom = HOC(CreateRoom, [applyHeader]);
const connectedCreateRoom = connect(mapStateToProps, mapDispatchToProps)(composedCreateRoom);
export default connectedCreateRoom;
