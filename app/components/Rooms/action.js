export function selectRoom(room) {
  return {
    type: 'ROOM_SELECTED',
    payload: room,
  };
}
