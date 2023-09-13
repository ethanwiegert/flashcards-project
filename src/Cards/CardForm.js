import React from "react";
import {useState, useEffect} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import {readDeck, readCard, updateCard} from "../utils/api"

function CardForm({setCard, card}){

const handleChange = ({target})=>{
    setCard({
        ...card,
        [target.name]: target.value,
    })

    }

    async function handleSubmit (event) {
        if (card){
        event.preventDefault();
            const abortController = new AbortController();
            await updateCard(card, abortController.signal);
            history.go(-1);}
            else{
                event.preventDefault();
                const abortController = new AbortController();
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
                setCard(response.cards);
                await createCard(deckId, card);
                history.go(-1)
            }
    }

   
    

const handleCancel = (event) =>{
    event.preventDefault();
    history.go(-1);
}





return(
    <div>
    <h5>Edit Card</h5>
    <form onSubmit={handleSubmit}>
        <label>Front</label>
        <textarea id="front" name="front" value={card.front} onChange={handleChange} type="text" defaultValue={`${card.front}`}/>
        <label>Back</label>
        <textarea id="back" name="back" value={card.back} onChange={handleChange} type="text" defaultValue={`${card.back}`}/>
        <button type="submit">Save</button>
        <button onClick={handleCancel}>Done</button>

    </form>
    </div>
)

}

export default CardForm