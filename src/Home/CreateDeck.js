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
    <nav aria-label="breadcrumb">
<ol class="breadcrumb">
<li class="breadcrumb-item"><a href="/">Home</a></li>

<li class="breadcrumb-item active" aria-current="page">Create Deck</li>
</ol>
</nav>
    <h2>Create Deck</h2>
    <form onSubmit={handleSubmit}>
        <label className="form-label">Name</label>
        <input placeholder="Deck Name" className="form-control" id="name" name="name" value={newDeck.name} onChange={handleChange} type="text"/>
        <label className="form-label mt-3">Description</label>
        <textarea rows="4" placeholder="Brief description of the deck" className="form-control" id="description" name="description" value={newDeck.description} onChange={handleChange} type="text"/>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        <button type="button" className="btn btn-primary m-2">Submit</button>
        

    </form>
    </div>
)

}


export default CreateDeck