import React from "react";
import {useState, useEffect} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import {readDeck, updateDeck} from "../utils/api"

function EditDeck(){
const history=useHistory()
const {deckId}=useParams()

let initialState={
    name:"",
    description:""
}

const [deck, setDeck]=useState(initialState)


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
    setDeck({
        ...deck,
        [target.name]: target.value,
    })

    }


async function handleSubmit (event) {
    event.preventDefault();
        const abortController = new AbortController();
        await updateDeck(deck, abortController.signal);
        history.go(-1);
}

const handleCancel = (event) =>{
    event.preventDefault();
    history.go(-1);
}





return(
  <div>
  <nav aria-label="breadcrumb">
<ol class="breadcrumb">
<li class="breadcrumb-item"><a href="/">Home</a></li>
<li class="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
<li class="breadcrumb-item active" aria-current="page">Edit Deck</li>
</ol>
</nav>
        <h5>Edit Deck</h5>
    <form onSubmit={handleSubmit}>
        <label className="form-label">Name</label>
        <input id="name" name="name" value={deck.name} onChange={handleChange} type="text" className="form-control"/>
        <label className="form-label">Description</label>
        <textarea id="description" name="description" value={deck.description} onChange={handleChange} type="text" className="form-control"/>
        <button onClick={handleCancel} type="button" className="btn btn-secondary">Cancel</button>
        <button type="submit button" className="btn btn-primary m-2">Submit</button>
       

    </form>
    </div>
)

}


export default EditDeck