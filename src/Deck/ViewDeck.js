import {useEffect, useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {readDeck, deleteDeck} from "../utils/api"


function ViewDeck(){
  const history=useHistory()


const [deck, setDeck] = useState([]);

useEffect(() => {
  async function displayDeck() {
    const abortController = new AbortController();
    try {
      const response = await readDeck(abortController.signal);
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
  <h6>Home/{deck.name}</h6>
    <ul className="deck">
      {deck.map((deck) => (
       
        <li key={deck.id}>
          <h5>
            {deck.name}
          </h5>
          <p>{deck.description}</p>
          <button >Edit</button>
          <button>Study</button>
          <button>Add Cards</button>
          <button onClick={handleDeckDelete}>Delete</button>
        </li>
      ))}
    </ul>
    <ul className="cards-list">
        {deck.map((card)=>(
            <li>
                <p>{card.front}</p>
                <p>{card.back}</p>
            </li>
        ))}
    </ul>
    </div>
  );
}

export default ViewDeck