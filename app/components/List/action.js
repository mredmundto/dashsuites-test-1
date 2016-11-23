import store from './../../store';
import Immutable, { Map } from 'immutable';

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
    // to get the application state
    const currList = store.getState().list;
    // to create the new issue list by getting the old issue list and pushing the new issue to the list
    const newIssueList = currList.get('data')
                        .get(roomIndex)
                        .get('reviewList')
                        .get(reviewIndex)
                        .get('issueList')
                        .push(Map(newIssue));
    //  to generate a new application state
    const newList = currList.setIn(['data', roomIndex, 'reviewList', reviewIndex, 'issueList'], newIssueList);
    return {
      type: 'ADD_ISSUE',
      store: newList,
    };
  },

  initApp: (currObj) => {
    const newList = Immutable.fromJS({ data: currObj });
    return {
      type: 'INIT_APP',
      store: newList,
    };
  },
};
