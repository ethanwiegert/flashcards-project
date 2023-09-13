import React from "react";
import {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {createDeck} from "../utils/api"

function CreateDeck(){
const history=useHistory()

let initialState={
    name:"",
    description:""
}

const [newDeck, setNewDeck]=useState(initialState)
//handleChange, handleSubmit, handleCancel

const handleChange = ({target})=>{
    setNewDeck({
        ...newDeck,
        [target.name]: target.value,
    })

    }


async function handleSubmit (event) {
    event.preventDefault();
        const abortController = new AbortController();
        await createDeck(newDeck, abortController.signal);
        history.push("/");
}

const handleCancel = (event) =>{
    event.preventDefault();
    history.push("/");
}





return(
    <div>
    <h5>Create Deck</h5>
    <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input id="name" name="name" value={newDeck.name} onChange={handleChange} type="text"/>
        <label>Description</label>
        <textarea id="description" name="description" value={newDeck.description} onChange={handleChange} type="text"/>
        <button type="submit">Submit</button>
        <button onClick={handleCancel}>Cancel</button>

    </form>
    </div>
)

}


export default CreateDeck