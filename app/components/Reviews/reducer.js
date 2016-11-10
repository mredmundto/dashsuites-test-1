const initialState = [
		{ room: '1', time:1478756810173, rating:5 },
];

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_REVIEW': {
      return [...state, action.payload];
    }
    default:
      return state;
  }
}
