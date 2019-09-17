import Book from "./Book";

export default interface AppStoreState {
  books: Book[];
  isLoading: boolean;
  error: string | null;
}
