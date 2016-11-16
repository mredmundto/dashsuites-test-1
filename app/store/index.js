import { combineReducers } from 'redux';
import router from '../components/Router/reducer';
import drawer from '../components/Drawer/reducer';
import RoomsReducer from '../components/Rooms/reducer';
import ActiveRoom from '../components/Rooms/Item/reducer';

const rootReducer = combineReducers({
  router,
  drawer,
  rooms: RoomsReducer,
  activeRoom: ActiveRoom,
});

export default rootReducer;
