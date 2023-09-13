import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home";
import CreateDeck from "../Home/CreateDeck";
import ViewDeck from "../Deck/ViewDeck";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard";
import EditDeck from "../Deck/EditDeck";
import StudyDeck from "../Deck/StudyDeck";

function Layout() {
  const {url}=useRouteMatch()
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
        <Route path="/decks/:deckId/edit">
          <EditDeck/>
        </Route>
        <Route exact path="/decks/:deckId">
          <ViewDeck/>
        </Route>
        <Route path="/decks/:deckId/study">
          <StudyDeck/>
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <AddCard/>
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard/>
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
