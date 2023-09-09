import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home";
import CreateDeck from "../Home/CreateDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
        <Home/>
        </Route>
        <Route path="/decks/new">
          <CreateDeck/>
        </Route>
        <Route>
        <NotFound />
        </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
