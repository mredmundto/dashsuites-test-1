import { Map, List } from 'immutable';

// const initialState = Map({
//   data: List([
//     Map({
//       name: 'Suite#1',
//       building: 'Tai Chi Court',
//       community: 'TST',
//       address: '5A, Tai Chi Court, 132-134 Austin Road, Tsim Sha Tsui, Kowloon',
//       reviewList: List([
//         Map({
//           createdAt: 'Nov 15 2016',
//           issueList: List([
//             Map({
//               flagged: true,
//               title: 'Some issue one',
//               createdAt: 'Nov 15 2016',
//             }),
//             Map({
//               flagged: true,
//               title: 'Some issue two',
//               createdAt: 'Nov 15 2016',
//             }),
//           ]),
//         }),
//       ]),
//     }),
//     Map({
//       name: 'Suite#1',
//       building: 'Tonnochy Tower',
//       community: 'Wan Chai',
//       address: '20J Tonnochy Tower, Block B, 250-274 Jaffe Road, Wan Chai',
//       reviewList: List([]),
//     }),
//   ]),
// });
      // Map({ room: 'Suite#3', building: 'Tai Chi Court', community: '1' }),

// to be updated when to fetch from server when the app starts, an empty state to make sure no error
const initialState = Map({
  room: List([
    Map({}),
  ]),
  review: List([
    Map({
      room: { 'name': 'testing' },
      createdAt: 'Seed data from client',
      issueList: List([
        Map({
          flagged: true,
          title: 'Some issue one',
          createdAt: 'Nov 15 2016',
        }),
      ]),
    }),
  ]),
});

const list = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ISSUE':
      return action.store;
    case 'LOAD_ROOM': {
      return state.mergeDeep(action.store);
    }
    case 'LOAD_REVIEW': {
      return state.mergeDeep(action.store);
    }

    // case 'SELECT_ITEM': {
    //   return state.setIn([action.listType, 'activeItem'], action.activeItem);
    // }
    default:
      return state;
  }
};

export default list;
