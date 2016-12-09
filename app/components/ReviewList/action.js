import store from './../../store';
import Immutable, { Map, List } from 'immutable';

export default {
  addIssueForNewReview: (newIssue) => {
    const currentIssueList = store.getState().review.get('tempIssueList').push(Map(newIssue));
    const newList = store.getState().review.set('tempIssueList', currentIssueList);
    return {
      type: 'ADD_ISSUE_FOR_NEW_REVIEW',
      store: newList,
    };
  },
  updateIssueForNewReview: (updatedIssue, index) => {
    const updatedIssueList = store.getState().review.get('tempIssueList').set(index, Map(updatedIssue));
    const newList = store.getState().review.set('tempIssueList', updatedIssueList);
    return {
      type: 'UPDATE_ISSUE_FOR_NEW_REVIEW',
      store: newList,
    };
  },
  deleteIssueForNewReview: (index) => {
    const updatedIssueList = store.getState().review.get('tempIssueList').delete(index);
    const newList = store.getState().review.set('tempIssueList', updatedIssueList);
    return {
      type: 'DELETE_ISSUE_FOR_NEW_REVIEW',
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
