import {useEffect, useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {deleteDeck, listDecks} from "../utils/api"


function DecksList(){


const [decks, setDecks] = useState([]);

useEffect(() => {
  async function loadDecks() {
    const abortController = new AbortController();
    try {
      const response = await listDecks(abortController.signal);
      setDecks(response);
    } catch (e) {
      console.log(e.name);
    }
    return () => {
      abortController.abort();
    };
  }
  loadDecks();
}, []);


  const handleDeckDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
     try {
       await deleteDeck(id);
       loadDecks();
     } catch (error) {
       console.log(error);
     }
     window.location.reload();
   }
 };


  return (
    <div>
  <button>Create Deck</button>
    <ul className="deck-list">
      {decks.map((deck) => (
       
        <li key={deck.id}>
          <button type="button" onClick={() => setDecks(deck)}>
            {deck.name}
          </button>
          <button>View</button>
          <button>Study</button>
          <button>Delete</button>
        </li>
      ))}
    </ul>
    </div>
  );
}

export default DecksList