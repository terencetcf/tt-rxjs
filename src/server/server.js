import express from "express";
import cors from "cors";
import { allReaders, allBooks } from "./data";

let port = 7777;
let app = express();

app.listen(port, console.log("Listing", port));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/books", (req, res) => {
  res.send(allBooks);
});

app.get("/readers", (req, res) => {
  res.send(allReaders);
});
