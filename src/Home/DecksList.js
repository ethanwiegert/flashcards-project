function DecksList({ decks, setDecks }){
console.log(decks);
console.log(setDecks);

  return (
    <div>
  <button>Create Deck</button>
    <ul className="deck-list">
      {decks.map((deck) => (
       
        <li key={deck.id}>
          <button type="button" onClick={() => setDecks(deck)}>
            {deck.name}
          </button>
          <button>View</button>
          <button>Study</button>
          <button>Delete</button>
        </li>
      ))}
    </ul>
    </div>
  );
}

export default DecksList