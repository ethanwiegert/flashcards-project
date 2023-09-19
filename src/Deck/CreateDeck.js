import React from "react";
import {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {createDeck} from "../utils/api"
import DeckForm from "./DeckForm";

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
        history.push(`/decks/${newDeck.id}`);
}

const handleCancel = (event) =>{
    event.preventDefault();
    history.push("/");
}


const name="Deck Name"
const description="Brief description of the deck"


return(
    <div>
    <nav aria-label="breadcrumb">
<ol class="breadcrumb">
<li class="breadcrumb-item"><a href="/">Home</a></li>

<li class="breadcrumb-item active" aria-current="page">Create Deck</li>
</ol>
</nav>
    <h2>Create Deck</h2>
  <DeckForm deck={newDeck} setDeck={setNewDeck} name={name} description={description}/>
    </div>
)

}


export default CreateDeck