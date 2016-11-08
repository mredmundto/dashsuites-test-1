import { combineReducers } from 'redux';
import RoomsReducer from '../components/Rooms/reducer';
import ActiveRoom from '../components/Rooms/Item/reducer';

const rootReducer = combineReducers({
  rooms: RoomsReducer,
  activeRoom: ActiveRoom,
});

export default rootReducer;
