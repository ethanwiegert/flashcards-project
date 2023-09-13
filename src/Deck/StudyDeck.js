import {useEffect, useState} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import {readDeck, deleteDeck, deleteCard} from "../utils/api"


function StudyDeck(){

  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "Loading...", cards: [] });
  const [isItFlipped, setIsItFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function loadDeck() {
          const abortController = new AbortController();
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

      if (deck.cards.length <= 2){
        return (
          <div>
            <h5>Home/{deck.name}/Study</h5>
            <p>Not Enough Cards</p>
            <p>You need at least 3 cards to study.  There are 2 cards in this deck.</p>
            <Link to={`/decks/${deckId}/cards/$new`}><button>Add Cards</button></Link>
          </div>
        )}
else if (!isItFlipped){
      return (
        <div>
          <h5>Home/{deck.name}/Study</h5>
          <p>{deck.cards[currentIndex].front}</p>
          <button onClick={clickToFlipCard()}>Flip</button>
        </div>
      )}
     else if (isItFlipped){
      return(
        <div>
        <h5>Home/{deck.name}/Study</h5>
        <p>{deck.cards[currentIndex].back}</p>
        <button onClick={clickToFlipCard()}>Flip</button>
        <button onClick={GetTheNextCard()}>Next</button>
      </div>
      )
     }
}

export default StudyDeck

