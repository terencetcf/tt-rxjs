import { combineReducers } from "redux";
import bookState from "./bookReducer";

export const rootReducer = combineReducers({
  bookState
});
