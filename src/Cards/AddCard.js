import React from "react";
import {useState} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import {readDeck, createCard} from "../utils/api"

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
        setCards(response.cards);
        await createCard(deckId, newCard);
        history.push((`/decks/deckId`))
    }


const handleCancel = (event) =>{
    event.preventDefault();
    history.go("-1");
}





return(
    <form onSubmit={handleSubmit}>
        <label>Front</label>
        <textarea id="front" name="front" value={newCard.front} onChange={handleChange} type="text"/>
        <label>Back</label>
        <textarea id="back" name="back" value={newCard.back} onChange={handleChange} type="text"/>
        <button type="submit">Save</button>
        <button onClick={handleCancel}>Done</button>

    </form>
)

}

export default AddCard
