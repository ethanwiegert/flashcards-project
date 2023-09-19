import React from "react";
import {useState, useEffect} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import {readDeck, readCard, updateCard, createCard} from "../utils/api"

function CardForm({card, setCard, frontPlaceholder, backPlaceholder}){
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
            history.go(0)
            }
    }

   
    

const handleCancel = (event) =>{
    event.preventDefault();
    history.go(-1);
}


console.log(backPlaceholder)
console.log(frontPlaceholder)





return(
    <div>
    <form onSubmit={handleSubmit}>
        <label className="form-label">Front</label>
        <textarea id="front" name="front" value={card.front} onChange={handleChange} type="text" placeholder={frontPlaceholder} className="form-control"/>
        <label className="form-label">Back</label>
        <textarea id="back" name="back" value={card.back} onChange={handleChange} type="text" placeholder={backPlaceholder} className="form-control"/>
        <button onClick={handleCancel} type="button" className="btn btn-secondary">Done</button>
        <button type="submit button" className="btn btn-primary ml-2">Save</button>
        

    </form>
    </div>
)

}

export default CardForm