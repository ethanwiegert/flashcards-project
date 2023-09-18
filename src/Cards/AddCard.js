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


const handleChange = ({target})=>{
    setNewCard({
        ...newCard,
        [target.name]: target.value,
    })

    }


    async function handleSubmit (event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
        setCards(response.cards);
        await createCard(deckId, newCard);
        history.go(-1)
    }


const handleCancel = (event) =>{
    event.preventDefault();
    history.go("-1");
}





return(
    <div>
    <nav aria-label="breadcrumb">
<ol class="breadcrumb">
<li class="breadcrumb-item"><a href="/">Home</a></li>
<li class="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
<li class="breadcrumb-item active" aria-current="page">Create Deck</li>
</ol>
</nav>
    <h4>{deck.name}: Add Card</h4>
   <CardForm card={newCard} setCard={setNewCard}/>
    </div>
)

}

export default AddCard
