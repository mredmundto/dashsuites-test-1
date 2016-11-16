import store from './../../store';
import { Map } from 'immutable';

export default {
  addItem: (newRoom, type) => {
    let roomList = store.getState().list.getIn([type, 'list']);

    roomList = roomList.push(Map(newRoom));

    return {
      type: 'ADD_ITEM',
      itemList: roomList,
      listType: type,
    };
  },
  selectItem: (activeItem, type) => {
    return {
      type: 'SELECT_ITEM',
      activeItem,
      listType: type,
    };
  },
};
