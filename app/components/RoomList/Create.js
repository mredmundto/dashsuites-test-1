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
import _ from 'lodash';

const {
  Input,
  DropDownAndroid,
} = Elements;

const window = Dimensions.get('window');

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      create: true,
      name: '',
      building: '',
      community: 'TST',
      address: '',
      professionalCleaning: 'OFF',
      id: null,
    };
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    if (this.props.selectedRoom.id === undefined) {
      this.setState({ create: true });
    } else {
      this.setState({
        create: false,
        name: this.props.selectedRoom.name,
        building: this.props.selectedRoom.building,
        community: this.props.selectedRoom.community,
        address: this.props.selectedRoom.address,
        professionalCleaning: this.props.selectedRoom.professionalCleaning,
        id: this.props.selectedRoom.id,
      });
    }
  }

  onClick() {
    if (this.state.create) {
      // post
      customFetch(`${constants.config.url}/REST/room`, {
        method: 'POST',
        body: {
          name: this.state.name,
          building: this.state.building,
          Community: this.state.community,
          address: this.state.address,
          professionalCleaning: this.state.professionalCleaning,
        },
      })
      .then(() => {
        Actions.pop();
      });
    } else {
      // put
      customFetch(`${constants.config.url}/REST/room/${this.state.id}`, {
        method: 'PUT',
        body: {
          id: this.state.id,
          name: this.state.name,
          building: this.state.building,
          Community: this.state.community,
          address: this.state.address,
          professionalCleaning: this.state.professionalCleaning,
        },
      })
      .then((resJSON) => {
        console.log('the resJSON after put', resJSON);
        
        Actions.pop();
      });
    }
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

    return (
      <View style={styles.container}>
        <ScrollView style={styles.insideContainer}>

          {this.state.create ?
            <Input
              headerText="name"
              placeholder={defaultObj.name}
              onChangeText={(name) => { this.setState({ name }); }}
            />
            :
            <Input
              headerText="name"
              value={this.state.name}
              onChangeText={(name) => { this.setState({ name }); }}
            />
          }

          {this.state.create ?
            <Input
              headerText="building"
              placeholder={defaultObj.building}
              onChangeText={(building) => { this.setState({ building }); }}
            />
            :
            <Input
              headerText="building"
              value={ this.state.building }
              onChangeText={(building) => { this.setState({ building }); }}
            />
          }

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


          {this.state.create ?
            <Input
              headerText="address"
              placeholder={defaultObj.address}
              onChangeText={(address) => { this.setState({ address }); }}
            />
            :
            <Input
              headerText="address"
              value={ this.state.address }
              onChangeText={(address) => { this.setState({ address }); }}
            />
          }

          <DropDownAndroid
            headerText="Professional Cleaning"
            options={[
              {
                value: 'OFF',
                label: 'OFF',
              },
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
          {this.props.selectedRoom.id === undefined ?
            <Text style={styles.bottomText}> Create </Text>
            :
            <Text style={styles.bottomText}> Update </Text>
          }
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
  selectedRoom: PropTypes.object,
};

function mapStateToProps(store) {
  // TODO: dynamic rendering
  const appSchema = store.list.toJS().appSchema;
  const selectedRoom = store.list.toJS().selectedRoom;
  return {
    appSchema,
    selectedRoom,
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
