import {useEffect, useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {deleteDeck, listDecks} from "../utils/api"


function DecksList(){
  const history=useHistory()


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


const handleDeckDelete = async (event) => {
  if (
    window.confirm("Are you sure you want to delete this deck?")
  ) {
    await deleteDeck(event);
    history.go(0);
  }
};


  return (
    <div>
  <button>Create Deck</button>
    <ul className="deck-list">
      {decks.map((deck) => (
       
        <li key={deck.id}>
          <h5>
            {deck.name}
          </h5>
          <p>{deck.description}</p>
          <button >View</button>
          <button>Study</button>
          <button onClick={handleDeckDelete}>Delete</button>
        </li>
      ))}
    </ul>
    </div>
  );
}

export default DecksList