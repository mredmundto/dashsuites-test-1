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
// import constants from '../../../constants';
import applyHeader from '../../../app/HOC/applyHeader';
import HOC from '../../../app/HOC';
import Action from './../List/action';
import constants from '../../../constants';

const {
  Input,
  DropDownAndroid,
} = Elements;

const window = Dimensions.get('window');

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      building: '',
      community: 'TST',
      address: '',
      professionalCleaning: 'Monday',
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    return customFetch(`${constants.config.url}/REST/room`, {
      method: 'POST',
      body: {
        name: this.state.name,
        building: this.state.building,
        community: this.state.community,
        address: this.state.address,
        professionalCleaning: this.state.professionalCleaning,
      },
    })
    .then((res) => {
      console.log('successful post object', res);
      Actions.RoomList();
      return true;
    })
    .catch(() => {
      return false;
    });
  }

  render() {
    const {
      source,
      data,
      roomList,
    } = this.props;

    const defaultObj = {
      name: 'please enter the room name here',
      building: 'please enter the room building here',
      community: 'please enter the room community here',
      address: 'please enter the room address here',
      professionalCleaning: 'please enter the professionalCleaning date here',
    };
    const room = room || defaultObj;


    // TODO: to dynamic render

    // this.props.appSchema.map((model) => {
    //   if (model.name === 'room') {
    //     model.fields.map((fieldsObj) => {
    //       console.log(fieldsObj)
    //     });
    //   }
    // });

    return (
      <View style={styles.container}>
        <ScrollView style={styles.insideContainer}>
          <Input
            headerText="name"
            placeholder={room.name}
            onChangeText={(name) => { this.setState({ name }); }}
          />

          <Input
            headerText="building"
            placeholder={room.building}
            onChangeText={(building) => { this.setState({ building }); }}
          />

          <DropDownAndroid
            headerText="Community"
            options={[
              {
                value: 'TST',
                label: 'TST',
              },
              {
                value: 'CWB1',
                label: 'CWB1',
              },
              {
                value: 'CWB2',
                label: 'CWB2',
              },
              {
                value: 'Wan Chai',
                label: 'Wan Chai',
              },
            ]}
            onValueChange={(community) => { this.setState({ community }); }}
          />


          <Input
            headerText="address"
            placeholder={room.address}
            onChangeText={(address) => { this.setState({ address }); }}
          />

          <DropDownAndroid
            headerText="Professional Cleaning"
            options={[
              {
                value: 'Monday',
                label: 'Monday',
              },
              {
                value: 'Tuesday',
                label: 'Tuesday',
              },
              {
                value: 'Wednesday',
                label: 'Wednesday',
              },
              {
                value: 'Thursday',
                label: 'Thursday',
              },
              {
                value: 'Friday',
                label: 'Friday',
              },
            ]}
            onValueChange={(professionalCleaning) => { this.setState({ professionalCleaning }); }}
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
    paddingBottom: 50,
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
  // TODO: dynamic rendering
  const appSchema = store.list.toJS().appSchema;
  return {
    appSchema,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // addRoom: (newRoom) => {
    //   return dispatch(Action.addItem(newRoom, 'rooms'));
    // },
  };
}

const composedCreateRoom = HOC(CreateRoom, [applyHeader]);
const connectedCreateRoom = connect(mapStateToProps, mapDispatchToProps)(composedCreateRoom);
export default connectedCreateRoom;
