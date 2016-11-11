const initialState = [
		{ number: 1, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-1.jpg', location: 'TST', price: '100' },
		{ number: 2, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-2.jpg', location: 'TST', price: '200' },
		{ number: 3, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-3.jpg', location: 'CWB', price: '300' },
    { number: 4, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-4.jpg', location: 'CWB', price: '400' },
    { number: 5, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-4.jpg', location: 'CWB', price: '400' },
    { number: 6, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-4.jpg', location: 'CWB', price: '400' },
    { number: 7, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-4.jpg', location: 'CWB', price: '400' },
    { number: 8, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-4.jpg', location: 'CWB', price: '400' },
    { number: 9, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-4.jpg', location: 'CWB', price: '400' },
    { number: 10, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-4.jpg', location: 'CWB', price: '400' },
    { number: 11, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-4.jpg', location: 'CWB', price: '400' },
    { number: 12, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-4.jpg', location: 'CWB', price: '400' },
    { number: 13, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-4.jpg', location: 'CWB', price: '400' },
    { number: 14, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-4.jpg', location: 'CWB', price: '400' },
    { number: 15, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-4.jpg', location: 'CWB', price: '400' },
    { number: 16, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-4.jpg', location: 'CWB', price: '400' },
    { number: 17, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-4.jpg', location: 'CWB', price: '400' },
    { number: 18, image: 'http://dashsuites.com/wp-content/themes/dashsuites/images/home-promo-4.jpg', location: 'CWB', price: '400' },
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
