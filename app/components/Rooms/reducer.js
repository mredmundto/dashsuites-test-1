const initialState = [
		{ number: 1, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-1.jpg', location: 'TST', price: '100' },
		{ number: 2, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-2.jpg', location: 'TST', price: '200' },
		{ number: 3, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-3.jpg', location: 'CWB', price: '300' },
		{ number: 4, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-4.jpg', location: 'CWB', price: '400' },
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
