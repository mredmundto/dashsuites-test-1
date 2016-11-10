import { combineReducers } from 'redux';
import RoomsReducer from '../components/Rooms/reducer';
import ActiveRoomReducer from '../components/Rooms/Item/reducer';
import ReviewsReducer from '../components/Reviews/reducer';

const rootReducer = combineReducers({
  rooms: RoomsReducer,
  activeRoom: ActiveRoomReducer,
  reviews: ReviewsReducer,
});

export default rootReducer;
