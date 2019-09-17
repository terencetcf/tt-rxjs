import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function bookReducer(state = initialState, action: any) {
  console.log(action.type);
  switch (action.type) {
    case types.ADD_BOOK:
    case types.FETCH_BOOKS:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case types.FETCH_BOOKS_SUCCESS:
    case types.ADD_BOOK_SUCCESS:
      return {
        books: [...action.payload],
        isLoading: false,
        error: null
      };

    case types.FETCH_BOOKS_FAIL:
    case types.ADD_BOOK_FAIL:
      return {
        books: [],
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
