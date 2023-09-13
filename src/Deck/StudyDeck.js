import {useEffect, useState} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import {readDeck, deleteDeck, deleteCard} from "../utils/api"


function StudyDeck(){

    const {deckId}=useParams()

    const [deck, setDeck]=useState([])

    const [cards, setCards]=useState([])


    useEffect(() => {
        async function loadDeck() {
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
        loadDeck(deckId);
      }, []);

if (cards.length<3){
      return (
        <div>
          <h5>Home/{deck.name}/Study</h5>
          <p>Not Enough Cards</p>
          <p>You need at least 3 cards to study.  There are 2 cards in this deck.</p>
          <Link to={`/decks/${deckId}/cards/$new`}><button>Add Cards</button></Link>
        </div>
      )}
     else{
      return(
        <div>
        <h5>Home/{deck.name}/Study</h5>
        <p>You need at least 3 cards to study.  There are 2 cards in this deck.</p>
        <button>Flip</button>
      </div>
      )
     }
}

export default StudyDeck

