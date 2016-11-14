import { combineReducers } from 'redux';
import router from '../components/Router/reducer';
import drawer from '../components/Drawer/reducer';
import roomList from '../components/RoomList/reducer';

const rootReducer = combineReducers({
  router,
  drawer,
  roomList,
});

export default rootReducer;
