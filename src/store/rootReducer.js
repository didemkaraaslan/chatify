import { combineReducers } from 'redux';
import { reducer as firebase } from 'react-redux-firebase';

const rootReducer = combineReducers({
  firebase,
});

export default rootReducer;
