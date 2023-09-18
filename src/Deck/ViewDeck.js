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
}, [deckId]);


const handleDeckDelete = async (deckId) => {
  if (
    window.confirm("Are you sure you want to delete this deck?")
  ) {
    await deleteDeck(deckId);
    history.go(0);
  }
};

const handleCardDelete = async (cardId) => {
  if (
    window.confirm("Delete this card?  You will not be able to recover it.")
  ) {
    await deleteCard(cardId);
    history.go(0);
  }
};



  return (
    <div>
      <nav aria-label="breadcrumb">
<ol class="breadcrumb">
<li class="breadcrumb-item"><a href="/">Home</a></li>
<li class="breadcrumb-item active" aria-current="page">{deck.name}</li>
</ol>
</nav>
    
       
          <h5>
            {deck.name}
          </h5>
          <p>{deck.description}</p>
          <div class="row d-flex flex-row pb-4">
          <Link to={`/decks/${deck.id}/edit`}><button type="button" className="ml-2 btn btn-secondary">Edit</button></Link>
                        <Link to={`/decks/${deck.id}/study`}><button type="button" className="ml-2 btn btn-primary"> Study</button></Link>
                        <Link to={`/decks/${deck.id}/cards/new`}><button type="button" className="ml-2 btn btn-primary">+ Add Cards</button></Link>
          <button onClick={()=>handleDeckDelete(deck.id)} type="button" className="ml-3 btn btn-danger d-flex justify-content-end" >Delete</button>
          </div>
       
        
         
{ cards.map(card => (
                            <div key={card.id} className="card w-75">
                                <div className="list-group-item">
                                    <div className="row">
                                        <div className="col-6 mr-auto">
                                            <p>{card.front}</p>
                                        </div>
                                        <div className="col-6">
                                            <p>{card.back}</p>
                                        </div>
                                    </div>
                                    <div className="row d-flex flex-row-reverse">
                                        <div className="col-auto">
                                            <Link to={`/decks/${deckId}/cards/${card.id}/edit`}><button type="button" className="btn btn-secondary">Edit</button></Link>
                                            <button onClick={()=>handleCardDelete(card.id)} type="button" className="btn btn-danger m-2">Delete</button>
                                        </div>
                                    </div>
                                </div>
                                </div>
))}
    
     </div>
  );
}


export default ViewDeck