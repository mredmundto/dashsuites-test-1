export default function (state = null, action) {
  switch (action.type) {
    case 'ROOM_SELECTED':
      return action.payload;
    default:
      return state;
  }
}
