import {combineReducers} from 'redux';

import menu from './menu';
import authReducer from './authSlice'

const reducers = combineReducers({menu, auth: authReducer});

export default reducers;
