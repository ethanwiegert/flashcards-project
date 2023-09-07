import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";
import AddCard from "./AddCard";
/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */


/**
 * Major components - deck, cards, card, buttons
 * Approach: 
 * 1 Files with appropriate routes
 * 2 Card: front and back, edit and delete button.
 * 3 Deck: name, description, edit, study, add cards, delete.
 * 4 Edit deck : Name , description, cancel, submit.
 * 5 Add card : Front, back, done, save.
 * 6 Edit card : Front, back, cancel, submit
 * 7 Study: Study:Deck Title, Card # of #, Front, flip, next button, restart prompt
 * 8 Home : Create deck, deck, deck title, deck description, view, study, delete for each deck.  Delete has confirm prompt.
 * 9
 * 10
 * 
 * 
 * 
 * 
 * Paths:
 * Home - "/" - Shows a list of decks with options to create, study, view, or delete a deck
 * Study - "/decks/:deckId/study" - Allows the user to study the cards from a specified deck
 * Create deck - "/decks/new" - Allows the user to create a new deck
 * Deck - "/decks/:deckId" - Shows all of the information about a specified deck with options to edit or add cards to the deck, navigate to the study screen, or delete the deck
 * Edit Deck - "/decks/:deckId/edit" - Allows the user to modify information on an existing deck
 * Add Card	/decks/:deckId/cards/new	Allows the user to add a new card to an existing deck
 * Edit Card	/decks/:deckId/cards/:cardId/edit	Allows the user to modify information on an existing card
 
 */

function App() {
  return (
    <div className="app-routes">
      <Switch>
        <Route path="/">
          <Layout />
        </Route>
        <Route path="">
          <AddCard/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
