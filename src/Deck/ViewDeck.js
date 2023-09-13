import {useEffect, useState} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import {readDeck, deleteDeck, deleteCard} from "../utils/api"


function ViewDeck(){
  const history=useHistory()

  const {deckId}=useParams()


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


const handleDeckDelete = async (event) => {
  if (
    window.confirm("Are you sure you want to delete this deck?")
  ) {
    await deleteDeck(event);
    history.go(0);
  }
};

const handleCardDelete = async (event) => {
  if (
    window.confirm("Are you sure you want to delete this card?")
  ) {
    await deleteCard(event);
    history.go(0);
  }
};



  return (
    <div>
  <h6>Home/{deck.name}</h6>
    <ul className="deck">
        <li key={deck.id}>
          <h5>
            {deck.name}
          </h5>
          <p>{deck.description}</p>
          <Link to={`/decks/${deckId}/edit`}><button>Edit</button></Link>
          <Link to={`/decks/${deck.id}/study`}><button>Study</button></Link>
          <Link to={`/decks/${deckId}/cards/new`}><button>Add Card</button></Link>
          <button onClick={handleDeckDelete}>Delete</button>
        </li>
        </ul>
        <ul className="cards-list">
        
         
{ cards.map(card => (
                            <li key={card.id}>
                                <div className="list-group-item">
                                    <div className="row">
                                        <div className="col-auto mr-auto">
                                            <p>{card.front}</p>
                                        </div>
                                        <div className="col-auto">
                                            <p>{card.back}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-auto">
                                            <Link to={`/decks/${deckId}/cards/${card.id}/edit`}><button>Edit</button></Link>
                                            <button onClick={handleCardDelete}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                                </li>
))}
    </ul>
     </div>
  );
}


export default ViewDeck