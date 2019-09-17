import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import BooksPage from "../pages/BooksPage";
import PageNotFound from "../pages/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/books" component={BooksPage} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
