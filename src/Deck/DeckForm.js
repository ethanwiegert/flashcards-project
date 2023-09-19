import React from "react";
import {useState} from "react"
import {useHistory} from "react-router-dom"
import {createDeck, updateDeck} from "../utils/api"

function DeckForm({deck, setDeck, name, description}){
    const history=useHistory()


const handleChange = ({target})=>{
    setDeck({
        ...deck,
        [target.name]: target.value,
    })

    }


async function handleSubmit (event) {
    event.preventDefault();
        const abortController = new AbortController();
        if(name==="Deck Name"){
            const response = await createDeck(deck, abortController.signal);

            history.push(`/decks/${response.id}`)}
        else{
            await updateDeck(deck, abortController.signal);
        history.go(-1);
        }
}

const handleCancel = (event) =>{
    event.preventDefault();
    history.push("/");
}





return(
    <div>
    
    <form onSubmit={handleSubmit}>
        <label className="form-label">Name</label>
        <input placeholder="Deck Name" className="form-control" id="name" name="name" value={deck.name} onChange={handleChange} type="text"/>
        <label className="form-label mt-3">Description</label>
        <textarea rows="4" placeholder="Brief description of the deck" className="form-control" id="description" name="description" value={deck.description} onChange={handleChange} type="text"/>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        <button type="submit button" className="btn btn-primary m-2">Submit</button>
        

    </form>
    </div>
)

}


export default DeckForm