import {useEffect, useState} from "react"
import {readDeck} from "../utils/api"


function CardsNumber({deckId}){
 
const [cards, setCards]=useState([])



useEffect(() => {
  async function displayDeck() {
    const abortController = new AbortController();
    try {
      const response = await readDeck(deckId, abortController.signal);
      setCards(response.cards);
    } catch (e) {
      console.log(e.name);
    }
    return () => {
      abortController.abort();
    };
  }
  displayDeck();
}, [deckId]);






  return (
     <p>{cards.length} Cards</p>
)
}


export default CardsNumber