import { Map, List } from 'immutable';

const initialState = Map({
  review: List([
    Map({
      room: { name: '' },
      createdAt: '',
      issueList: List([
        // Map({
        //   flagged: true,
        //   title: 'Some issue one',
        //   createdAt: 'Nov 15 2016',
        // }),
      ]),
    }),
  ]),
  tempIssueList: List([]),
  selectedRoomId: null,
});

const review = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ISSUE_FOR_NEW_REVIEW': {
      return action.store;
    }
    case 'UPDATE_ISSUE_FOR_NEW_REVIEW': {
      return action.store;
    }
    case 'DELETE_ISSUE_FOR_NEW_REVIEW': {
      return action.store;
    }
    case 'CLEAR_TEMP_ISSUE': {
      return action.store;
    }
    case 'LOAD_REVIEW': {
      return state.set('review', action.store);
    }
    case 'SELECT_ROOM_ID':
      return state.set('selectedRoomId', action.store);
    default:
      return state;
  }
};

export default review;
