const initialState = [
		{ number: 'Room 1', location: 'TST', price: '100' },
		{ number: 'Room 2', location: 'TST', price: '200' },
		{ number: 'Room 3', location: 'CWB', price: '300' },
		{ number: 'Room 4', location: 'CWB', price: '400' },
];

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_ROOM': {
      return [...state, action.payload];
    }
    default:
      return state;
  }
}
