import * as types from "./actionTypes";
import Book from "../../interfaces/Book";

export const fetchBooks = () => ({
  type: types.FETCH_BOOKS
});

export const fetchBooksSuccess = (books: Book[]) => ({
  type: types.FETCH_BOOKS_SUCCESS,
  payload: books
});

export const fetchBooksFail = (message: string) => ({
  type: types.FETCH_BOOKS_FAIL,
  payload: message
});

export const addBook = () => ({
  type: types.ADD_BOOK
});

export const addBookSuccess = (books: Book[]) => ({
  type: types.ADD_BOOK_SUCCESS,
  payload: books
});

export const addBookFail = (message: string) => ({
  type: types.ADD_BOOK_FAIL,
  payload: message
});
