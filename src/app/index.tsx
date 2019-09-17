import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Observable, of, from, interval } from "rxjs";
import {
  timeInterval,
  delay,
  debounceTime,
  flatMap,
  map,
  take,
  pluck
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { allBooks } from "../server/data";
import Book from "../interfaces/Book";
import BookList from "../components/BookList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchKeywords, setSearchKeyWords] = useState("");

  useEffect(() => {
    console.log(books.length);

    const subscription = ajax("http://localhost:7777/books")
      .pipe(pluck("response"))
      .subscribe(
        response => {
          setBooks([...response]);
        },
        err => {
          toast.error("An error has occurred: " + err.message, {
            autoClose: false
          });
          console.error(err);
        },
        () => {
          console.log("Api called completed!");
        }
      );

    return () => {
      console.log("unsubscribe");
      subscription.unsubscribe();
    };
  }, []);

  const notify = () => toast("Wow so easy !");

  const handleClick = () => {
    console.log(books);
    notify();
    setBooks([...books, { bookID: 99, title: "unknown99" }]);
  };

  const handleSearchKeywordsChanged = event => {
    setSearchKeyWords(event.target.value);
  };

  const getFilteredBooks = (): Book[] => {
    return books.filter(
      book => book.title.search(new RegExp(searchKeywords, "i")) > -1
    );
  };

  return (
    <>
      <ToastContainer />
      <h1>Items</h1>
      <button onClick={handleClick}>Add</button>
      <input
        value={searchKeywords}
        onChange={handleSearchKeywordsChanged}
        type="text"
      />
      <BookList books={getFilteredBooks()} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
