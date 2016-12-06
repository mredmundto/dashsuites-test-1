import { Map, List } from 'immutable';

const initialState = Map({
  room: List([
    Map({}),
  ]),
  selectedRoom: Map({}),
});

const room = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_ROOM':
      return state.set('room', action.store);
    case 'SELECT_ROOM':
      return state.set('selectedRoom', action.store);
    default:
      return state;
  }
};

export default room;
