import { Map, List } from 'immutable';

const initialState = List([
  Map({
    name: 'Suite#1',
    building: 'Tai Chi Court',
    community: 'TST-1',
    address: '5A, Tai Chi Court, 132-134 Austin Road, Tsim Sha Tsui, Kowloon',
    reviews: List([
      Map({
        issues: '3/4',
        room: 'Suite#1 TST-1',
        created: 'Nov 15 2016',
        issueList: List([
          Map({
            flagged: true,
            title: 'Issue Title Name',
            created: 'Nov 15 2016',
          }),
        ]),
      }),
    ]),
  }),
]);
      // Map({ room: 'Suite#2', building: 'Tai Chi Court', community: '1' }),
      // Map({ room: 'Suite#3', building: 'Tai Chi Court', community: '1' }),
      // Map({ room: 'Suite#19', building: 'Brilliant Court', community: '1' }),
      // Map({ room: 'Suite#20', building: 'Universal Mansion', community: '1' }),
      // Map({ room: 'Suite#21', building: 'Universal Mansion', community: '1' }),
      // Map({ room: 'Suite#1', building: 'Malahon Apartments', community: '2' }),
      // Map({ room: 'Suite#2', building: 'Vienna Mansion', community: '2' }),
      // Map({ room: 'Suite#3', building: 'Vienna Mansion', community: '2' }),
      // Map({ room: 'Suite#16', building: 'Greenfield Mansion', community: '2' }),
      // Map({ room: 'Suite#17', building: 'Greenfield Mansion', community: '2' }),
      // Map({ room: 'Suite#9', building: 'Lei Ha Court', community: '3' }),
      // Map({ room: 'Suite#10', building: 'Lei Ha Court', community: '3' }),
      // Map({ room: 'Suite#11', building: 'Lei Ha Court', community: '3' }),
      // Map({ room: 'Suite#1', building: 'Tonnochy Tower', community: '2' }),

      // Map({ issues: '3/4', room: 'Suite#1 - community 1', created: 'Nov 15 2016' }),
      // Map({ issues: '3/4', room: 'Suite#9 - community 3', created: 'Nov 9 2016' }),
      // Map({ issues: '4/4', room: 'Suite#20 - community 1 ', created: 'Oct 8 2016' }),

      // Map({ flagged: true, title: 'Issue Title Name', created: 'Nov 9 2016' }),
      // Map({ flagged: true, title: 'Issue Title Name', created: 'Oct 8 2016' }),

const list = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ISSUE':
      return action.store;
    // case 'ADD_ITEM':
    //   return state.setIn([action.listType, 'list'], action.itemList);

    // case 'SELECT_ITEM': {
    //   return state.setIn([action.listType, 'activeItem'], action.activeItem);
    // }
    default:
      return state;
  }
};

export default list;
