import { Map, List } from 'immutable';

const initialState = Map({
  rooms: Map({
    list: List([
      Map({ number: 'Room 1', location: 'TST', price: '100' }),
      Map({ number: 'Room 2', location: 'TST', price: '100' }),
      Map({ number: 'Room 3', location: 'CWB', price: '200' }),
      Map({ number: 'Room 4', location: 'CWB', price: '200' }),
      Map({ number: 'Room 5', location: 'TST', price: '300' }),
      Map({ number: 'Room 6', location: 'TST', price: '300' }),
      Map({ number: 'Room 7', location: 'CWB', price: '400' }),
      Map({ number: 'Room 8', location: 'CWB', price: '400' }),
      Map({ number: 'Room 9', location: 'TST', price: '100' }),
      Map({ number: 'Room 10', location: 'TST', price: '100' }),
      Map({ number: 'Room 11', location: 'CWB', price: '200' }),
      Map({ number: 'Room 12', location: 'CWB', price: '200' }),
      Map({ number: 'Room 13', location: 'TST', price: '300' }),
      Map({ number: 'Room 14', location: 'TST', price: '300' }),
      Map({ number: 'Room 15', location: 'CWB', price: '400' }),
      Map({ number: 'Room 16', location: 'CWB', price: '400' }),
    ]),
    activeItem: {},
  }),
  reviews: Map({
    list: List([
      Map({ resolvedIssue: 3, totalIssue: 4, room: 'A - CWB', created: 'Nov 8' }),
      Map({ resolvedIssue: 4, totalIssue: 4, room: 'A - CWB', created: 'Nov 8' }),
      Map({ resolvedIssue: 3, totalIssue: 4, room: 'A - CWB', created: 'Nov 8' }),
      Map({ resolvedIssue: 4, totalIssue: 4, room: 'A - CWB', created: 'Nov 8' }),
      Map({ resolvedIssue: 3, totalIssue: 4, room: 'A - CWB', created: 'Nov 8' }),
      Map({ resolvedIssue: 3, totalIssue: 4, room: 'A - CWB', created: 'Nov 8' }),
      Map({ resolvedIssue: 3, totalIssue: 4, room: 'A - CWB', created: 'Nov 8' }),
      Map({ resolvedIssue: 2, totalIssue: 4, room: 'A - CWB', created: 'Nov 8' }),
      Map({ resolvedIssue: 3, totalIssue: 4, room: 'A - CWB', created: 'Nov 8' }),
      Map({ resolvedIssue: 3, totalIssue: 4, room: 'A - CWB', created: 'Nov 8' }),
      Map({ resolvedIssue: 3, totalIssue: 4, room: 'A - CWB', created: 'Nov 8' }),
      Map({ resolvedIssue: 3, totalIssue: 4, room: 'A - CWB', created: 'Nov 8' }),
      Map({ resolvedIssue: 3, totalIssue: 4, room: 'A - CWB', created: 'Nov 8' }),
      Map({ resolvedIssue: 3, totalIssue: 4, room: 'A - CWB', created: 'Nov 8' }),
      Map({ resolvedIssue: 3, totalIssue: 4, room: 'A - CWB', created: 'Nov 8' }),
      Map({ resolvedIssue: 3, totalIssue: 4, room: 'A - CWB', created: 'Nov 8' }),
    ]),
    activeItem: {},
  }),
});

const list = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return state.setIn([action.listType, 'list'], action.itemList);

    case 'SELECT_ITEM': {
      return state.setIn([action.listType, 'activeItem'], action.activeItem);
    }
    default:
      return state;
  }
};

export default list;
