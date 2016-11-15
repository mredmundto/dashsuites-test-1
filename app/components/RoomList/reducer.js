import { Map, List } from 'immutable';

const initialState = Map({
  rooms: List([
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
  activeRoom: '',
});

const roomList = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ROOM':
      return state.set('rooms', action.rooms);

    case 'SELECT_ROOM': {
      return {
        ...state,
        activeRoom: action.activeRoom,
      };
    }
    default:
      return state;
  }
};

export default roomList;
