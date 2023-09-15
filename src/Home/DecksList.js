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

const handleCreate = (event) =>{
  event.preventDefault();
  history.push("/decks/new");
}




  return (
    <div>
  <button  onClick={handleCreate} type="button" className="btn btn-secondary">+ Create Deck</button>
    <div className="deck-list">
      {decks.map((deck) => (
       
       <div class="card w-75">
  <div class="card-body">
    <div class="row card-title">
    <h5 class="col-10">{deck.name}</h5>
    <p class="justify-content-end">{decks.length} Cards</p>
    </div>
    <div>
    <p class="card-text">{deck.description}</p>
    </div>
    <div class="row">
    <Link to={`/decks/${deck.id}`}><button type="button" class="btn btn-secondary">View</button></Link>
          <Link to={`/decks/${deck.id}/study`}><button type="button" class="btn btn-primary">Study</button></Link>
          <button type="button" class="btn btn-danger" onClick={handleDeckDelete}>Delete</button>
    </div>
  </div>
</div>


      ))}
    </div>
    </div>
  );
}

export default DecksList