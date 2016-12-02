import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Action from './../../app/components/List/action';
import Promise from 'bluebird';

const check = require('../../app/resources/images/check.png');
const cross = require('../../app/resources/images/cross.png');

// TODO: REFACTOR IN UTIL

const today = new Date('2016-11-30');
// const today = new Date();

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
const currentMondayString = formattedDate(getMonday(today));

let displayDay = (today).getDay() - 1;
if (displayDay === -1) {
  displayDay = 0;
} else if (displayDay > 4) {
  displayDay = 4;
}


class LinenButtom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: this.props.val.selectedDate,
    };
    this.checkToCross = this.checkToCross.bind(this);
    this.crossToCheck = this.crossToCheck.bind(this);
  }

  // this is to map the array in cleaning schedule back to PC / BC / OFF
  mapCleaningType(resJSON) {
    for (let i = 0; i < resJSON.length; i++) {
      if (resJSON[i].schedule[this.props.selectedDay] === 1 || resJSON[i].schedule[this.props.selectedDay] === 2) {
        resJSON[i].cleaning = 'PC';
        resJSON[i].linen = {
          roomId: resJSON[i].id,
          schedule: resJSON[i].schedule,
          startingMonday: currentMondayString,
          selectedDate: this.props.selectedDay,
        };
      } else if (resJSON[i].schedule[this.props.selectedDay] === 0) {
        resJSON[i].cleaning = 'BC';
        resJSON[i].linen = {
          roomId: resJSON[i].id,
          schedule: resJSON[i].schedule,
          startingMonday: currentMondayString,
          selectedDate: this.props.selectedDay,
        };
      } else if (resJSON[i].schedule[this.props.selectedDay] === 3) {
        resJSON[i].cleaning = 'None';
        resJSON[i].linen = {
          roomId: resJSON[i].id,
          schedule: resJSON[i].schedule,
          startingMonday: currentMondayString,
          selectedDate: this.props.selectedDay,
        };
      }
    }
    return resJSON;
  }

  checkToCross() {
    const newArr = this.props.val.schedule.slice();
    newArr[this.props.val.selectedDate] = 2;
    const promiseChain = Promise.resolve();
    promiseChain
    .then(() => {
      return customFetch('http://staging.adminpanel.dashsuites.com/api/customWeek', {
        method: 'POST',
        body: {
          roomId: this.props.val.roomId,
          startingMonday: this.props.val.startingMonday,
          schedule: JSON.stringify(newArr),
        },
      });
    })
    .then(() => {
      return customFetch(`http://staging.adminpanel.dashsuites.com/api/customWeek?startingMonday=${currentMondayString}`, {
        method: 'GET',
      });
    })
    .then((resJSON) => {
      this.props.loadCleaningSchedule(this.mapCleaningType(resJSON));
    })
    .catch((e) => {
      console.log(e);
    });
  }

  crossToCheck() {
    const newArr = this.props.val.schedule.slice();
    newArr[this.props.val.selectedDate] = 1;
    const promiseChain = Promise.resolve();
    promiseChain
    .then(() => {
      return customFetch('http://staging.adminpanel.dashsuites.com/api/customWeek', {
        method: 'POST',
        body: {
          roomId: this.props.val.roomId,
          startingMonday: this.props.val.startingMonday,
          schedule: JSON.stringify(newArr),
        },
      });
    })
    .then(() => {
      return customFetch(`http://staging.adminpanel.dashsuites.com/api/customWeek?startingMonday=${currentMondayString}`, {
        method: 'GET',
      });
    })
    .then((resJSON) => {
      this.props.loadCleaningSchedule(this.mapCleaningType(resJSON));
    })
    .catch((e) => {
      console.log(e);
    });
  }

  render() {
    return (
      <View>
        {(this.props.val.schedule[this.props.val.selectedDate] === 1) ?
          <TouchableOpacity onPress={this.checkToCross}>
            <Image
              style={styles.linenIcon}
              source={check}
            />
          </TouchableOpacity>
          :
          (this.props.val.schedule[this.props.val.selectedDate] === 2) ?
            <TouchableOpacity onPress={this.crossToCheck}>
              <Image
                style={styles.linenIcon}
                source={cross}
              />
            </TouchableOpacity>
            :
            <Text> N/A </Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  linenIcon: {
    height: 15,
    width: 15,
  },
});

LinenButtom.propTypes = {
  val: PropTypes.object,
  loadCleaningSchedule: PropTypes.func,
  selectedDay: PropTypes.number,
};

function mapStateToProps(store) {
  const data = store.list.toJS();
  return {
    selectedDay: data.selectedDay,
  };
}


const mapDispatchToProps = (dispatch) => {
  return {
    selectDay: (day) => {
      dispatch(Action.selectDay(day));
    },
    loadCleaningSchedule: (initObj) => {
      dispatch(Action.loadCleaningSchedule(initObj));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinenButtom);
