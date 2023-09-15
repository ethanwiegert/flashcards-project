import {useEffect, useState} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import {readDeck, deleteDeck, deleteCard} from "../utils/api"


function StudyDeck(){

  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "Loading...", cards: [] });
  const [isItFlipped, setIsItFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const abortController = new AbortController();
  const [error, setError] = useState(undefined);

 
    useEffect(() => {
      
        async function loadDeck() {
          
          try {
            const response = await readDeck(deckId, abortController.signal);
            setDeck(response);
          } catch (e) {
            console.log(e.name);
          }
          return () => {
            abortController.abort();
          };
        }
        loadDeck();
      }, [deckId]);

      function GetTheNextCard() {
        //if no more cards in the deck, window.confirm
        if (currentIndex === deck.cards.length - 1) {
          const result = window.confirm(
            "Do you want to restart the deck and study again?"
          );
          if (result) {
            setCurrentIndex(0);
          }
          //if there are still cards in the deck,
          //change the state for the index, the card, and the flip
        } else {
          //make a new variable so dont have to wait for the state to change
    
          setCurrentIndex(currentIndex + 1);
         setIsItFlipped((prevState) => !prevState);
        }
      }

      function clickToFlipCard() {
        setIsItFlipped((prevState) => !prevState);
      }

      if (error) {
        return error;
      }

      if (deck.cards.length <= 2){
        return (
          <div>
            <a href="/">Home</a>
            <a href={`/decks/${deckId}`}>{deck.name}</a>
            <h5>Study</h5>
            <p>Not Enough Cards</p>
            <p>You need at least 3 cards to study.  There are 2 cards in this deck.</p>
            <Link to={`/decks/${deckId}/cards/$new`}><button>Add Cards</button></Link>
          </div>
        )}
else if (!isItFlipped){
      return (
        <div>
         <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item"><a href="{`/decks/${deckId}`}">{deck.name}</a></li>
    <li class="breadcrumb-item active" aria-current="page">Study</li>
  </ol>
</nav>
            <h2>Study: {deck.name}</h2>
            
            <div className="card">
           <div class="card-body">
            <h5>Card {currentIndex +1} of {deck.cards.length}</h5>
          <p>{deck.cards[currentIndex].front}</p>
          
          
          <button onClick={clickToFlipCard} type="button" className="btn btn-secondary">Flip</button>
          </div>

          </div>
        </div>
      )}
     else if (isItFlipped){
      return(
        <div>
         <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
    <li class="breadcrumb-item active" aria-current="page">Study</li>
  </ol>
</nav>
            <h2>Study: {deck.name}</h2>
            
            <div className="card">
           <div class="card-body">
            <h5>Card {currentIndex +1} of {deck.cards.length}</h5>
          <p>{deck.cards[currentIndex].back}</p>
          
          
          <button onClick={clickToFlipCard} type="button" className="btn btn-secondary">Flip</button>
<button onClick={GetTheNextCard} type="button" className="btn btn-primary ml-2">Next</button>
          </div>

          </div>
        </div>
      )
     }
}

export default StudyDeck

