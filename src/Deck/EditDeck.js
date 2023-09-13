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
        history.push("/");
}

const handleCancel = (event) =>{
    event.preventDefault();
    history.push("/");
}





return(
    <div>
        <h5>Edit Deck</h5>
    <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input id="name" name="name" value={deck.name} onChange={handleChange} type="text"/>
        <label>Description</label>
        <textarea id="description" name="description" value={deck.description} onChange={handleChange} type="text"/>
        <button type="submit">Submit</button>
        <button onClick={handleCancel}>Cancel</button>

    </form>
    </div>
)

}


export default EditDeck