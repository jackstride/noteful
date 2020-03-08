import { combineReducers } from "redux";

import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import folderReducer from "./folderReducer";
import taskReducer from "./taskReducer";
import contextMenuReducer from "./contextMenuReducer";
import noteReducer from "./noteReducer";
import handleResponse from "./handleResponse";

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  folder: folderReducer,
  task: taskReducer,
  contextMenu: contextMenuReducer,
  note: noteReducer,
  handleResponse: handleResponse
});
