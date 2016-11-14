import store from './../../store';

export default {
  addRoom: (newRoom) => {
    const roomList = store.getState().rooms;

    roomList.push(newRoom);

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
