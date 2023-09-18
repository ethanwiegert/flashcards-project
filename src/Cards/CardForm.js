import React from "react";
import {useState, useEffect} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import {readDeck, readCard, updateCard, createCard} from "../utils/api"

function CardForm({card, setCard}){
const history=useHistory()
const { deckId, cardId } = useParams();




const handleChange = ({target})=>{
    setCard({
        ...card,
        [target.name]: target.value,
    })

    }

 
    async function handleSubmit (event) {
        event.preventDefault();
        const abortController = new AbortController();
        if(card.length) { 
            await updateCard(card, abortController.signal);
            history.go(-1);} 
          else { 
            await createCard(deckId, card);
            history.go(-1)}
    }

   
    

const handleCancel = (event) =>{
    event.preventDefault();
    history.go(-1);
}

function frontPlaceholder(){
    if(card.front===""){
        return `${card.front}`
    }
    else{return "Front side of card"}
}

function backPlaceholder(){
    if(card.back===""){
        return "Back side of card"
    }
    else{return `${card.back}`}
}






return(
    <div>
    <form onSubmit={handleSubmit}>
        <label>Front</label>
        <textarea id="front" name="front" value={card.front} onChange={handleChange} type="text" placeholder={frontPlaceholder}/>
        <label>Back</label>
        <textarea id="back" name="back" value={card.back} onChange={handleChange} type="text" placeholder={backPlaceholder}/>
        <button type="submit">Save</button>
        <button onClick={handleCancel}>Done</button>

    </form>
    </div>
)

}

export default CardForm