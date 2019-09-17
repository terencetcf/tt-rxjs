import { combineEpics } from "redux-observable";
import { fetchBooksEpic, addBookEpic } from "../epics/booksEpics";

export const rootEpic = combineEpics(addBookEpic, fetchBooksEpic);
