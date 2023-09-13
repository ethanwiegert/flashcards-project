import React from "react";
import {useState, useEffect} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import {readDeck, updateCard} from "../utils/api"

function EditCard(){
const history=useHistory()
const { deckId, cardId } = useParams();

const initialState = {
    id: "",
    front: "",
    back: "",
    deckId: ""
  }


const [card, setCard]=useState(initialState)
const [cards, setCards]=useState([])
const [deck, setDeck]=useState([])

useEffect(() => {
    async function loadDeck() {
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
    loadDeck();
  }, []);


const handleChange = ({target})=>{
    setCard({
        ...card,
        [target.name]: target.value,
    })

    }


    async function handleSubmit (event) {
     //Abort controller for  API call
     const abortController = new AbortController()

     //use function passed from page
    updateCard( event, abortController.signal);
     setCards(card);
     history.goBack();

     //Abort controller
     return () => abortController.abort();
    }

   
    

const handleCancel = (event) =>{
    event.preventDefault();
    history.go(-1);
}





return(
    <div>
    <h5>Edit Card</h5>
    <form onSubmit={handleSubmit}>
        <label>Front</label>
        <textarea id="front" name="front" value={card.front} onChange={handleChange} type="text" defaultValue="1"/>
        <label>Back</label>
        <textarea id="back" name="back" value={card.back} onChange={handleChange} type="text" defaultValue="hello"/>
        <button type="submit">Save</button>
        <button onClick={handleCancel}>Done</button>

    </form>
    </div>
)

}

export default EditCard