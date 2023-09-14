import React from "react";
import {useState} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
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
    <h6>{deck.name}: Add Card</h6>
   <CardForm card={newCard} setCard={setNewCard}/>
    </div>
)

}

export default AddCard
