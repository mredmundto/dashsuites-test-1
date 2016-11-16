import store from './../../store';
import { Map } from 'immutable';

export default {
  // addItem: (newRoom, type) => {
  //   let roomList = store.getState().list.getIn([type, 'list']);

  //   roomList = roomList.push(Map(newRoom));

  //   return {
  //     type: 'ADD_ITEM',
  //     itemList: roomList,
  //     listType: type,
  //   };
  // },
  // selectItem: (activeItem, type) => {
  //   return {
  //     type: 'SELECT_ITEM',
  //     activeItem,
  //     listType: type,
  //   };
  // },
  addIssue: (newIssue, roomIndex, reviewIndex) => {
    let currList = store.getState().list;
    let issue = currList.getIn([roomIndex, 'reviews', reviewIndex, 'issueList']);
    console.log('issue', issue);
    issue = issue.push(Map(newIssue));
    currList = currList.setIn([roomIndex, 'reviews', reviewIndex, 'issueList'], issue);
    // currList = currList.get(roomIndex).get('reviews').get(reviewIndex).set('issueList', issue);
    return {
      type: 'ADD_ISSUE',
      store: currList,
     };
  },
};
