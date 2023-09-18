import {useEffect, useState} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import {readDeck, deleteDeck, deleteCard} from "../utils/api"


function CardsNumber({deckId}){
  const history=useHistory()



const [deck, setDeck] = useState([]);
const [cards, setCards]=useState([])



useEffect(() => {
  async function displayDeck() {
    const abortController = new AbortController();
    try {
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
      setCards(response.cards);
    } catch (e) {
      console.log(e.name);
    }
    return () => {
      abortController.abort();
    };
  }
  displayDeck();
}, []);






  return (
     <p>{cards.length} Cards</p>
)
}


export default CardsNumber