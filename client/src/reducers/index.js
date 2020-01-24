import {combineReducers} from 'redux';

import errorReducer from './errorReducer'
import authReducer from './authReducer'
import folderReducer from './folderReducer'
import taskReducer from './taskReducer'


export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    folder: folderReducer,
    task: taskReducer,

})