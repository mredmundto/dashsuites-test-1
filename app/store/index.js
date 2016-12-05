import { createStore, combineReducers, applyMiddleware } from 'redux';
import router from '../components/Router/reducer';
import drawer from '../components/Drawer/reducer';
import list from '../components/List/reducer';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  router,
  drawer,
  list,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);


export default store;
