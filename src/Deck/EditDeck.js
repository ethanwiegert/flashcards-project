import React from "react";
import {useState, useEffect} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import {readDeck, updateDeck} from "../utils/api"
import DeckForm from "./DeckForm";

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

const name=`${deck.name}`
const description=`${deck.description}`


return(
  <div>
  <nav aria-label="breadcrumb">
<ol class="breadcrumb">
<li class="breadcrumb-item"><a href="/">Home</a></li>
<li class="breadcrumb-item"><a href={`/decks/${deck.id}`}>{deck.name}</a></li>
<li class="breadcrumb-item active" aria-current="page">Edit Deck</li>
</ol>
</nav>
        <h2>Edit Deck</h2>
        <DeckForm deck={deck} setDeck={setDeck} name={name} description={description}/>
    </div>
)

}


export default EditDeck