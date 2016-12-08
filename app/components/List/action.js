import store from './../../store';
import Immutable, { Map, List } from 'immutable';

export default {
  // adding schema first
  loadSchema: (schemaObj) => {
    const newList = Immutable.fromJS(schemaObj);
    return {
      type: 'LOAD_SCHEMA',
      store: newList,
    };
  },
  loadCleaningSchedule: (currObj) => {
    const newList = Immutable.fromJS(currObj);
    return {
      type: 'LOAD_ClEANING_SCHEDULE',
      store: newList,
    };
  },
  loadLinenSchedule: (currObj) => {
    const newList = Immutable.fromJS(currObj);
    return {
      type: 'LOAD_LINEN_SCHEDULE',
      store: newList,
    };
  },
  selectRoom: (roomObj) => {
    return {
      type: 'SELECT_ROOM',
      store: roomObj,
    };
  },
  selectDay: (day) => {
    return {
      type: 'SELECT_DAY',
      store: day,
    };
  },
};
