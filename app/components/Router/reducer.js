import { ActionConst } from 'react-native-router-flux';

const initialState = {
  scene: {},
  navigationState: {},
};

export default function reducer(state = initialState, action = {}) {
  console.log(action);
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.scene,
      };

    default:
      return state;
  }
}
