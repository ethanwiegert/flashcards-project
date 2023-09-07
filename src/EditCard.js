import React, { useState } from "react";
import { Route, useRouteMatch } from "react-router-dom";

function EditCard(){
    const url=useRouteMatch()
   
    const [cardFront, setCardFront] = useState("");
  const handleCardFrontChange=(event)=>setCardFront(event.target.value);

  const [cardBack, setCardBack] = useState("");
  const handleCardBackChange=(event)=>setCardBack(event.target.value);

//readDeck()
//readCard()

    return(
        <Route path={`${url}/edit`}>
        <div>
            
            <h3></h3>
            <form>
                <label htmlFor="cardFront">Card Front</label>
                <textarea id="cardFront" name="cardFront" typ="text" value={card.front} onChange={handleCardFrontChange}/>
                <label htmlFor="cardBack">Card Bacl</label>
                <textarea id="cardBack" name="cardBacl" typ="text" value={card.back} onChange={handleCardBackChange}/>
                <button type="cancel">Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
        </Route>
    )
}

export default EditCard