import store from './../../store';
import Immutable, { Map, List } from 'immutable';

export default {
  addIssueForNewReview: (newIssue) => {
    const currentIssueList = store.getState().review.get('tempIssueList').push(Map(newIssue));
    const newList = store.getState().review.set('tempIssueList', currentIssueList);
    console.log('add new issue in action', store.getState());
    return {
      type: 'ADD_ISSUE_FOR_NEW_REVIEW',
      store: newList,
    };
  },
  clearTempIssue: () => {
    const newList = store.getState().review.set('tempIssueList', List([]));
    return {
      type: 'CLEAR_TEMP_ISSUE',
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
  selectRoomId: (id) => {
    return {
      type: 'SELECT_ROOM_ID',
      store: id,
    };
  },
};
