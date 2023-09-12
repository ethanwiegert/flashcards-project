import React from "react";
import {useState} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import {readDeck, updateCard} from "../utils/api"

function EditCard(){
const history=useHistory()
const { deckId, cardId } = useParams();

let initialState={
    front:"",
    back:""
}

const [card, setCard]=useState(initialState)
const [cards, setCards]=useState([])
const [deck, setDeck]=useState([])


const handleChange = ({target})=>{
    setCard({
        ...card,
        [target.name]: target.value,
    })

    }


    async function handleSubmit (event) {
        event.preventDefault();
        const abortController = new AbortController();
        const response = await readDeck(deckId, abortController.signal);
        
        setCards(response.cards);
        const updatedCard=cards.find((card)=>card.id===cardId)
        await updateCard(updatedCard);
        history.go(-1)
    }

   


const handleCancel = (event) =>{
    event.preventDefault();
    history.go("-1");
}





return(
    <div>
    <h5>Edit Card</h5>
    <form onSubmit={handleSubmit}>
        <label>Front</label>
        <textarea id="front" name="front" value={card.front} onChange={handleChange} type="text" default={`${updatedCard.front}`}/>
        <label>Back</label>
        <textarea id="back" name="back" value={card.back} onChange={handleChange} type="text" default={`${updatedCard.back}`}/>
        <button type="submit">Save</button>
        <button onClick={handleCancel}>Done</button>

    </form>
    </div>
)

}

export default EditCard