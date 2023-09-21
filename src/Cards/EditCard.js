import React from "react";
import {useState, useEffect} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import {readDeck, readCard, updateCard} from "../utils/api"
import CardForm from "./CardForm";

function EditCard(){
const history=useHistory()
const { deckId, cardId } = useParams();

const initialState = {
    id: "",
    front: "",
    back: "",
    deckId: ""
  }


const [card, setCard]=useState(initialState)
const [cards, setCards]=useState([])
const [deck, setDeck]=useState([])

useEffect(() => {
    async function loadDeck() {
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
    loadDeck();
  }, []);

  useEffect(() => {
    async function loadCard() {
      const abortController = new AbortController();
      try {
        const response = await readCard(cardId, abortController.signal);
        setCard(response);
      } catch (e) {
        console.log(e.name);
      }
      return () => {
        abortController.abort();
      };
    }
    loadCard();
  }, []);






const frontPlaceholder=`${card.front}`
const backPlaceholder=`${card.front}`


return(
    <div>
       <nav aria-label="breadcrumb">
<ol class="breadcrumb">
<li class="breadcrumb-item"><a href="/">Home</a></li>
<li class="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
<li class="breadcrumb-item active" aria-current="page">Edit Card {card.id}</li>
</ol>
</nav>
    <h5>Edit Card</h5>
    <CardForm card={card} setCard={setCard} frontPlaceholder={frontPlaceholder} backPlaceholder={backPlaceholder}/>
    </div>
)

}

export default EditCard