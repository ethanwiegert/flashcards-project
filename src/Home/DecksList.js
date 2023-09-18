import {useEffect, useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {deleteDeck, listDecks, readDeck} from "../utils/api"
import CardsNumber from "./CardsNumber"


function DecksList(){
  const history=useHistory()



const [decks, setDecks] = useState([]);
const [cards, setCards] = useState([]);

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




const handleDeckDelete = async (deckId) => {
  if (
    window.confirm("Are you sure you want to delete this deck?")
  ) {
    await deleteDeck(deckId);
    history.go(0);
  }
};

const handleCreate = (event) =>{
  event.preventDefault();
  history.push("/decks/new");
}




  return (
    <div className="pb-5">

      <div className="pb-3">
  <button  onClick={handleCreate} type="button" className="btn btn-secondary">+ Create Deck</button>
  </div>

    <div className="deck-list">
      {decks.map((deck) => (
       
       <div className="card w-75">
  <div className="card-body">
    <div className="row card-text">
    <h5 className="col-10">{deck.name}</h5>
    <p className="col-2"><CardsNumber deckId={deck.id}/></p>
    </div>
    <div className="row d-flex">
    <p className="card-text col-12">{deck.description}</p>
    </div>
    <div className="row pt-3 d-flex flex-row">
  <div className="col-1"><Link to={`/decks/${deck.id}`}><button type="button" className="btn btn-secondary flex-row">View</button></Link></div>
  <div className="col-9"><Link to={`/decks/${deck.id}/study`}><button type="button" className="btn btn-primary d-flex flex-row">Study</button></Link></div>
  <div className="col-2"><button type="button" className="btn btn-danger d-flex justify-content-end" onClick={()=>handleDeckDelete(deck.id)}>Delete</button>
    </div>
</div>
  </div>
</div>


      ))}
    </div>
    </div>
  );
}

export default DecksList