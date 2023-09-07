import React, { useState, useEffect } from "react";
import DecksList from "./DecksList";
import {listDecks} from ".././utils/api"

function Home(){
const [decks, setDecks] = useState([]);
useEffect(()=>{
    setDecks([]);
    const controller = new AbortController();
    const signal = controller.signal;
  
    
    listDecks();
    return () => {
    controller.abort();
     }
  }, []);

  return(
    <DecksList decks={decks} setDecks={setDecks}/>
  )

}

  
  export default Home;
  