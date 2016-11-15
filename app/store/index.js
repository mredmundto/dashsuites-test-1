import { createStore, combineReducers, applyMiddleware } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import router from '../components/Router/reducer';
import drawer from '../components/Drawer/reducer';
import roomList from '../components/RoomList/reducer';

const rootReducer = combineReducers({
  router,
  drawer,
  roomList,
});
// const createStoreWithMiddleware = applyMiddleware()(createStore);
// const store = createStoreWithMiddleware(rootReducer, devToolsEnhancer());
const store = createStore(rootReducer);

export default store;
