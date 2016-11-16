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
// importing the constants for theme
import constants from '../../../constants';

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
    console.log('clicked!');
  }

  render() {
    const {
      data,
      roomList,
    } = this.props;

    const room = roomList.find((r) => r.get('name') === data).toJS();
    return (
      <View style={styles.container}>
        <ScrollView style={styles.insideContainer}>
          <Input
            headerText="Room"
            editable={false}
            placeholder={data}
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
                  value: 'TST-1',
                  label: 'TST-1',
                },
                {
                  value: 'TST-2',
                  label: 'TST-2',
                },
                {
                  value: 'Wan Chai',
                  label: 'Wan Chai',
                },
                {
                  value: 'Causeway Bay',
                  label: 'Causeway Bay',
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

        </ScrollView>

        <TouchableOpacity
          style={styles.bottom} onPress={() => this.onClick()}
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
    addIssue: (newIssue, roomIndex, reviewIndex) => {
      return dispatch(Action.addIssue(newIssue, roomIndex, reviewIndex));
    },
  };
}


const composedCreateReview = HOC(CreateReview, [applyHeader]);
const connectedCreateReview = connect(mapStateToProps, mapDispatchToProps)(composedCreateReview);
export default connectedCreateReview;
