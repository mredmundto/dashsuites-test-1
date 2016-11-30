import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import HOC from '../../HOC';
import applyHeader from '../../HOC/applyHeader';
import allList from '../../../composeComponents/ResourceList';
import Action from './../List/action';

// const displayedInList = ['name', 'building', 'community'];
console.log('ResourceList', ResourceList);
// const window = Dimensions.get('window');

const ResourceList = allList.List;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // backgroundColor: '#F5FCFF',
  },
  content: {
    fontSize: 13,
    // fontSize: (window.width)/50,
    alignItems: 'center',
    color: '#FFFFFF',
  },
  dateSelector: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
  },
  dateItem: {
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#3E50B4',
    margin: 5,
    padding: 5,
    width: 65,
    height: 50,
  },
  // selectedDateItem: {
  //   alignItems: 'center',
  //   borderRadius: 5,
  //   backgroundColor: '#3E50B4',
  //   margin: 5,
  //   padding: 5,
  //   width: window.width/40,
  //   height: 50,
  // },
  list: {
    flexDirection: 'column',
  },
  listItem: {
    fontSize: 50,
  },
});

class CleaningList extends Component {
  constructor(props) {
    super(props);
    this.selectRoom = this.selectRoom.bind(this);
    this.selectDate = this.selectDate.bind(this);
  }

  componentWillMount() {
    
    const getMonday = ((d) => {
      d = new Date(d);
      const day = d.getDay(),
          diff = d.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(d.setDate(diff));
    });

    const formattedDate = ((date) => {
      let month = '' + (date.getMonth() + 1);
      let day = '' + date.getDate();
      const year = date.getFullYear();
      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) {
        day = '0' + day;
      }
      return [day, month, year].join('');
    });

    // const currentMondayString = formattedDate(getMonday(new Date('2015-03-31')));
    const currentMondayString = formattedDate(getMonday(new Date()));

    customFetch('http://127.0.0.1:3000/api/customDate?statingMonday=' +currentMondayString, {
      method: 'GET',
    })
    .then((resJSON) => {

      console.log(resJSON);
      //this.props.loadRoom(resJSON);
    })
    .catch((e) => {
      console.log(e);
    });

  }

  selectDate(selectDateObj) {
    console.log(selectDateObj);
    // Actions.RoomEdit();
  }

  selectRoom(selectedRoom, roomIndex) {
    // TODO: refactor this to go to the room
    Actions.RoomView(`${roomIndex}`);
  }

  render() {
    const {
      toggleDrawer,
    } = this.props;

    const dateArrObj = [
      { 1: 'Mon' },
      { 2: 'Tue' },
      { 3: 'Wed' },
      { 4: 'Thu' },
      { 5: 'Fri' },
    ];

    const data = [
      { Type: 'BC', Rooms: '1-5', Location: 'TST' },
      { Type: 'BC', Rooms: '1-5', Location: 'TST' },
      { Type: 'BC', Rooms: '1-5', Location: 'TST' },
      { Type: 'BC', Rooms: '1-5', Location: 'TST' },
      { Type: 'BC', Rooms: '1-5', Location: 'TST' },
      { Type: 'BC', Rooms: '1-5', Location: 'TST' },
      { Type: 'BC', Rooms: '1-5', Location: 'TST' },
      { Type: 'BC', Rooms: '1-5', Location: 'TST' },
      { Type: 'BC', Rooms: '1-5', Location: 'TST' },
      { Type: 'BC', Rooms: '1-5', Location: 'TST' },
      { Type: 'BC', Rooms: '1-5', Location: 'TST' },
      { Type: 'BC', Rooms: '1-5', Location: 'TST' },
      { Type: 'BC', Rooms: '1-5', Location: 'TST' },
    ];
    return (
      <View style={styles.container} >
        <View>
          <ScrollView style={styles.dateSelector} horizontal={true}>
            {dateArrObj.map((Obj) => {
              return (
                <TouchableOpacity
                  style={styles.dateItem}
                  key={Object.keys(Obj)[0]}
                  onPress={() => this.selectDate(Obj)}
                >
                  <Text style={styles.content}> {Obj[Object.keys(Obj)[0]]} </Text>
                  <Text style={styles.content}> {Object.keys(Obj)[0]} </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.list}>
          <ResourceList
            displayedInList={['Type', 'Rooms', 'Location']}
            data={data}
          />
        </View>

      </View>
    );
  }
}

CleaningList.defaultProps = {
  allowCreate: true,
  rooms: [],
  infiniteScroll: true,
};

CleaningList.propTypes = {
  toggleDrawer: PropTypes.func,
  allowCreate: PropTypes.bool,
  rooms: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
  ]),
  infiniteScroll: PropTypes.bool,
  selectRoom: PropTypes.func,
  loadRoom: PropTypes.func,
};

function mapStateToProps(store) {
  const data = store.list.toJS();
  return {
    rooms: data.room,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    // selectRoom: (selectedRoom) => {
    //   dispatch(Action.selectItem(selectedRoom, 'rooms'));
    // },
    // loadRoom: (initObj) => {
    //   dispatch(Action.loadRoom(initObj));
    // },
    toggleDrawer: (open) => {
      dispatch({
        type: 'TOGGLE_DRAWER',
        open,
      });
    },
  };
};

const composedCleaningList = HOC(CleaningList, [applyHeader]);
const connectedCleaningList = connect(mapStateToProps, mapDispatchToProps)(composedCleaningList);
export default connectedCleaningList;
