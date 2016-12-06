import store from './../../store';
import Immutable, { Map } from 'immutable';

export default {
  loadRoom: (currObj) => {
    const newList = Immutable.fromJS(currObj);
    return {
      type: 'LOAD_ROOM',
      store: newList,
    };
  },
  selectRoom: (roomObj) => {
    return {
      type: 'SELECT_ROOM',
      store: roomObj,
    };
  },
};
