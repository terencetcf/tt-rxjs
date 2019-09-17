import React, { Component } from "react";
import Book from "../interfaces/book";

interface BookListProps {
  books: Book[];
}

const BookList: React.FunctionComponent<BookListProps> = ({ books }) => {
  return (
    <ul>
      {books.map(book => {
        return <li key={book.bookID}>{book.title}</li>;
      })}
    </ul>
  );
};

export default BookList;
