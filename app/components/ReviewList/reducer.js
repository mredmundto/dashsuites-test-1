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
});

const review = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ISSUE_FOR_NEW_REVIEW': {
      console.log('add issue', state)
      return action.store;
    }
    case 'CLEAR_TEMP_ISSUE':{
            console.log('Clear issue', state)
      return action.store;
    }
    case 'LOAD_REVIEW':{
      console.log('load review', state)
      return state.set('review', action.store);
    }
    default:
      return state;
  }
};

export default review;
