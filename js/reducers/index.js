
import { combineReducers } from 'redux';
import userReducer from './user';
import classesReducer from './classes';

export default combineReducers({
	userStore: userReducer,
	classesStore:classesReducer,
});
