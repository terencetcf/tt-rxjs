import { ofType } from "redux-observable";
import { Observable, of, from } from "rxjs";
import { delay, switchMap, map, catchError } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import * as types from "../actions/actionTypes";
import {
  fetchBooksSuccess,
  fetchBooksFail,
  addBookSuccess,
  addBookFail
} from "../actions/bookActions";
import Book from "../../interfaces/Book";

const url = "http://localhost:7777/books";

export function fetchBooksEpic(action$: Observable<any>) {
  // action$ is a stream of actions
  // action$.ofType is the outer Observable
  return action$.pipe(
    ofType(types.FETCH_BOOKS), // is just a simpler version of .filter(x => x.type === FETCH_BOOKS)
    delay(500),
    switchMap(() => {
      // ajax calls from Observable return observables. This is how we generate the inner Observable
      return ajax
        .getJSON(url) // getJSON simply sends a GET request with Content-Type application/json
        .pipe(
          map((books: any) =>
            books.map((book: any) => ({
              bookID: book.bookID,
              title: book.title,
              author: book.author,
              publicationYear: book.publicationYear
            }))
          ) // we need to iterate over the whiskies and get only the properties we need
        );
      // at the end our inner Observable has a stream of an array of whisky objects which will be merged into the outer Observable
    }),
    map(books => {
      console.log(books, "fetch");
      return fetchBooksSuccess(books);
    }), // map the resulting array to an action of the type
    catchError(error => of(fetchBooksFail(error.message)))
    // every action that is contained in the stream returned from the epic is dispatched to Redux, this is why we map the actions to streams.
    // if an error occurs, create an Observable of the action to be dispatched on error. Unlike other operators, catch does not explicitly return an Observable.
  );
}

export function addBookEpic(action$: Observable<any>, state$: any) {
  return action$.pipe(
    ofType(types.ADD_BOOK),
    switchMap(() => {
      const books = [...state$.value.bookState.books];
      const latestId = Math.max(...books.map(book => book.bookID));
      const newBook: Book = {
        bookID: latestId + 1,
        title: "Book " + (latestId + 1).toString(),
        author: "Terence",
        publicationYear: 2019
      };
      books.push(newBook);

      return [books];
    }),
    map(books => {
      return addBookSuccess(books);
    }),
    catchError(error => {
      console.log(error);
      return of(addBookFail(error.message));
    })
  );
}
