import {useEffect, useState} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import {readDeck, deleteDeck, deleteCard} from "../utils/api"


function StudyDeck(){

    const {deckId}=useParams()

    const [deck, setDeck]=useState([])


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
      }, []);


      return (
        <div>
          <h5>Home/{deck.name}/Study</h5>
          <p></p>
          <buton></buton>
        </div>
      )
     
}

export default StudyDeck

