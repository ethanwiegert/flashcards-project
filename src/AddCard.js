import React, { useState } from "react";

function AddCard(){
   
    const [cardFront, setCardFront] = useState("");
  const handleCardFrontChange=(event)=>setCardFront(event.target.value);

  const [cardBack, setCardBack] = useState("");
  const handleCardBackChange=(event)=>setCardBack(event.target.value);



    return(
        <div>
            
            <h1>React Router: Add Card</h1>
            <form>
                <label htmlFor="cardFront">Card Front</label>
                <textarea id="cardFront" name="cardFront" typ="text" value={cardFront} onChange={handleCardFrontChange}/>
                <label htmlFor="cardBack">Card Bacl</label>
                <textarea id="cardBack" name="cardBacl" typ="text" value={cardBack} onChange={handleCardBackChange}/>
                <button type="done">Done</button>
                <button type="save">Save</button>
            </form>
        </div>
    )
}


export default AddCard