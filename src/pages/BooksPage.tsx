import React, { useEffect, useState, FunctionComponent } from "react";
import { pluck } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import Book from "../interfaces/Book";
import BookList from "../components/BookList";
import { toast } from "react-toastify";

const BooksPage: FunctionComponent = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchKeywords, setSearchKeyWords] = useState("");

  useEffect(() => {
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
          toast.info("All books have been successfully retrieved.");
        }
      );

    return () => {
      subscription.unsubscribe();
      toast.dismiss();
    };
  }, []);

  const handleClick = () => {
    setBooks([...books, { bookID: 99, title: "unknown99" } as Book]);
  };

  const handleSearchKeywordsChanged = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setSearchKeyWords(event.currentTarget.value);
  };

  const getFilteredBooks = (): Book[] => {
    return books.filter(
      book => book.title.search(new RegExp(searchKeywords, "i")) > -1
    );
  };

  return (
    <>
      <h1>Books</h1>
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

export default BooksPage;
