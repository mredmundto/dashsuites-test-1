import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import HOC from '../../HOC';
import applyHeader from '../../HOC/applyHeader';
import allList from '../../../composeComponents/ResourceList';
import Action from './../List/action';
import constants from '../../../constants';

const ResourceList = allList.List;

const getMonday = ((d) => {
  d = new Date(d);
  const day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
});

const formattedDate = ((date) => {
  let month = `${(date.getMonth() + 1)}`;
  let day = `${date.getDate()}`;
  const year = date.getFullYear();
  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }
  return [day, month, year].join('');
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  content: {
    fontSize: 13,
    alignItems: 'center',
  },
  dateSelector: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
  },
  dateItem: {
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
    padding: 5,
    width: 65,
    height: 50,
  },
  dateItemSelected: {
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#3E50B4',
    margin: 5,
    padding: 5,
    width: 65,
    height: 50,
  },
  dateItemSelectedText: {
    fontSize: 13,
    alignItems: 'center',
    color: '#FFFFFF',
  },
  list: {
    flexDirection: 'column',
  },
  listItem: {
    fontSize: 50,
  },
});

const today = new Date('2016-11-30');
// const today = new Date();

let displayDay = (today).getDay() - 1;
if (displayDay === -1) {
  displayDay = 0;
} else if (displayDay > 4) {
  displayDay = 4;
}

class LinenList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: displayDay,
    };
    this.selectRoom = this.selectRoom.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.mapLinenToType = this.mapLinenToType.bind(this);
  }

  componentWillMount() {
    // If today is Monday, we are getting Friday cleaning Schedule
    let currentMondayString;
    if (this.state.selectedDate === 0) {
      currentMondayString = formattedDate(getMonday(new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000)));
    } else {
      currentMondayString = formattedDate(getMonday(today));
    }
    customFetch(`${constants.config.url}/api/customWeek?startingMonday=${currentMondayString}`, {
      method: 'GET',
    })
    .then((resJSON) => {
      console.log('the resJSON', resJSON);
      this.props.loadLinenSchedule(this.mapLinenToType(resJSON));
    })
    .catch((e) => {
      console.log(e);
    });
  }
  // returning all the objects that are to display in list
  mapLinenToType(resJSON) {
    const arr = [];
    // if today is Monday, get last week's Friday
    if (this.state.selectedDate === 0) {
      for (let i = 0; i < resJSON.length; i++) {
        if (resJSON[i].schedule[4] === 1) {
          arr.push(resJSON[i]);
        }
      }
    } else {
      // if not, get the previous day
      for (let i = 0; i < resJSON.length; i++) {
        if (resJSON[i].schedule[this.state.selectedDate - 1] === 1) {
          arr.push(resJSON[i]);
        }
      }
    }
    return arr;
  }

  selectDate(selectDateObj) {
    this.setState({ selectedDate: selectDateObj.index }, () => {
      // If today is Monday, we are getting Friday cleaning Schedule
      let currentMondayString;
      if (this.state.selectedDate === 0) {
        currentMondayString = formattedDate(getMonday(new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000)));
      } else {
        currentMondayString = formattedDate(getMonday(today));
      }

      customFetch(`${constants.config.url}/api/customWeek?startingMonday=${currentMondayString}`, {
        method: 'GET',
      })
      .then((resJSON) => {
        this.props.loadLinenSchedule(this.mapLinenToType(resJSON));
      })
      .catch((e) => {
        console.log(e);
      });
    });
  }

  selectRoom(selectedRoom) {
    this.props.rooms.forEach((room) => {
      if (room.id === selectedRoom.id) {
        this.props.selectRoom(room);
      }
    });
    Actions.CleaningItem();
  }

  render() {
    const {
      toggleDrawer,
    } = this.props;

    const Monday = getMonday(today);
    const dateArrObj = [
      {
        Mon: Monday.getDate(),
        index: 0,
      },
      {
        Tue: new Date(Monday.getTime() + 1 * 24 * 60 * 60 * 1000).getDate(),
        index: 1,
      },
      {
        Wed: new Date(Monday.getTime() + 2 * 24 * 60 * 60 * 1000).getDate(),
        index: 2,
      },
      {
        Thu: new Date(Monday.getTime() + 3 * 24 * 60 * 60 * 1000).getDate(),
        index: 3,
      },
      {
        Fri: new Date(Monday.getTime() + 4 * 24 * 60 * 60 * 1000).getDate(),
        index: 4,
      },
    ];   
    return (
      <View style={styles.container} >
        <View>
          <ScrollView style={styles.dateSelector} horizontal={true}>
            {dateArrObj.map((Obj) => {
              return (
                Obj.index === this.state.selectedDate ?
                  <TouchableOpacity
                    style={styles.dateItemSelected}
                    key={Object.keys(Obj)[0]}
                    onPress={() => this.selectDate(Obj)}
                  >
                    <Text style={styles.dateItemSelectedText}> {Object.keys(Obj)[0]} </Text>
                    <Text style={styles.dateItemSelectedText}> {Obj[Object.keys(Obj)[0]]} </Text>
                  </TouchableOpacity>
                :
                  <TouchableOpacity
                    style={styles.dateItem}
                    key={Object.keys(Obj)[0]}
                    onPress={() => this.selectDate(Obj)}
                  >
                    <Text style={styles.content}> {Object.keys(Obj)[0]} </Text>
                    <Text style={styles.content}> {Obj[Object.keys(Obj)[0]]} </Text>
                  </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.list}>
          <ResourceList
            displayedInList={['name', 'community']}
            data={this.props.linenSchedule}
            onItemPress={this.selectRoom}
          />
        </View>

      </View>
    );
  }
}

LinenList.defaultProps = {
  allowCreate: true,
  rooms: [],
  infiniteScroll: true,
};

LinenList.propTypes = {
  toggleDrawer: PropTypes.func,
  allowCreate: PropTypes.bool,
  rooms: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
  ]),
  infiniteScroll: PropTypes.bool,
  selectRoom: PropTypes.func,
  loadRoom: PropTypes.func,
  loadLinenSchedule: PropTypes.func,
  cleaningSchedule: PropTypes.array,
  linenSchedule: PropTypes.array,
};

function mapStateToProps(store) {
  const data = store.list.toJS();
  return {
    rooms: data.room,
    linenSchedule: data.linenSchedule,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectRoom: (selectedRoom) => {
      dispatch(Action.selectRoom(selectedRoom));
    },
    loadLinenSchedule: (initObj) => {
      dispatch(Action.loadLinenSchedule(initObj));
    },
    toggleDrawer: (open) => {
      dispatch({
        type: 'TOGGLE_DRAWER',
        open,
      });
    },
  };
};

const composedLinenList = HOC(LinenList, [applyHeader]);
const connectedLinenList = connect(mapStateToProps, mapDispatchToProps)(composedLinenList);
export default connectedLinenList;
