const initialState = {
  open: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        open: !!action.open,
      };

    default:
      return state;
  }
}
