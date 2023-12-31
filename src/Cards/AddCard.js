import React from "react";
import {useState, useEffect} from "react"
import {useHistory, useParams} from "react-router-dom"
import {readDeck, createCard} from "../utils/api"
import CardForm from "./CardForm";

function AddCard(){
const history=useHistory()
const {deckId}=useParams()

let initialState={
    front:"",
    back:""
}

const [newCard, setNewCard]=useState(initialState)
const [cards, setCards]=useState([])
const [deck, setDeck]=useState([])


useEffect(() => {
    async function displayDeck() {
      const abortController = new AbortController();
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (e) {
        console.log(e.name);
      }
      return () => {
        abortController.abort();
      };
    }
    displayDeck();
  }, []);





const frontPlaceholder=`Front side of card`
const backPlaceholder=`Back side of card`

return(
    <div>
    <nav aria-label="breadcrumb">
<ol class="breadcrumb">
<li class="breadcrumb-item"><a href="/">Home</a></li>
<li class="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
<li class="breadcrumb-item active" aria-current="page">Add Card</li>
</ol>
</nav>
    <h4>{deck.name}: Add Card</h4>
   <CardForm card={newCard} setCard={setNewCard} frontPlaceholder={frontPlaceholder} backPlaceholder={backPlaceholder}/>
    </div>
)

}

export default AddCard
