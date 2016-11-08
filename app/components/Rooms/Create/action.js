export function addRoom(room) {
  return {
    type: 'ADD_ROOM',
    payload: room,
  };
}
