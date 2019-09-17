import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Book from "../interfaces/Book";
import BookList from "../components/BookList";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchBooks, addBook } from "../store/actions/bookActions";
import AppStoreState from "../interfaces/AppStoreState";

interface IProps extends AppStoreState {
  fetchBooks: () => any;
  addBook: () => any;
}

const BooksPage: React.FunctionComponent<IProps> = ({
  books,
  isLoading,
  error,
  fetchBooks,
  addBook
}) => {
  const [searchKeywords, setSearchKeyWords] = useState("");

  useEffect(() => {
    if (books && books.length > 0) {
      return;
    }

    console.log(books.length);

    fetchBooks();
  }, [books]);

  const getFilteredBooks = (): Book[] => {
    return books
      ? books.filter(
          book => book.title.search(new RegExp(searchKeywords, "i")) > -1
        )
      : [];
  };

  const handleAddBookClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    addBook();
  };

  const handleSearchKeywordsChanged = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setSearchKeyWords(event.currentTarget.value);
  };

  return (
    <>
      <h1>Books</h1>
      {books.length < 1 || isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <button onClick={handleAddBookClick}>Add Book</button>
          <input
            value={searchKeywords}
            onChange={handleSearchKeywordsChanged}
            type="text"
          />
          <BookList books={getFilteredBooks()} />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  ...state.bookState
});

const mapDispatchToProps = {
  fetchBooks,
  addBook
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BooksPage);
