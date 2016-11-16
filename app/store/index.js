import { createStore, combineReducers, applyMiddleware } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import router from '../components/Router/reducer';
import drawer from '../components/Drawer/reducer';
import list from '../components/List/reducer';

const rootReducer = combineReducers({
  router,
  drawer,
  list,
});
// const createStoreWithMiddleware = applyMiddleware()(createStore);
// const store = createStoreWithMiddleware(rootReducer, devToolsEnhancer());
const store = createStore(rootReducer);

export default store;
