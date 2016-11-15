import store from './../../store';
import { Map } from 'immutable';

export default {
  addRoom: (newRoom) => {
    let roomList = store.getState().roomList.get('rooms');

    roomList = roomList.push(Map(newRoom));

    return {
      type: 'ADD_ROOM',
      rooms: roomList,
    };
  },
  selectRoom: (activeRoom) => {
    return {
      type: 'SELECT_ROOM',
      activeRoom,
    };
  },
};
