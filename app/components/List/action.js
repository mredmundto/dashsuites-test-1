import store from './../../store';
import Immutable, { Map, List } from 'immutable';

export default {
  addIssueForNewReview: (newIssue) => {
    const currentIssueList = store.getState().list.get('tempIssueList').push(Map(newIssue));
    const newList = store.getState().list.set('tempIssueList', currentIssueList);
    return {
      type: 'ADD_ISSUE_FOR_NEW_REVIEW',
      store: newList,
    };
  },
  clearTempIssue: () => {
    const newList = store.getState().list.set('tempIssueList', List([]));
    return {
      type: 'CLEAR_TEMP_ISSUE',
      store: newList,
    };
  },
  // adding schema first
  loadSchema: (schemaObj) => {
    const newList = Immutable.fromJS(schemaObj);
    return {
      type: 'LOAD_SCHEMA',
      store: newList,
    };
  },
  loadRoom: (currObj) => {
    const newList = Immutable.fromJS(currObj);
    return {
      type: 'LOAD_ROOM',
      store: newList,
    };
  },
  loadReview: (currObj) => {
    const newList = Immutable.fromJS(currObj);
    return {
      type: 'LOAD_REVIEW',
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
