import React, { useState } from "react";
import { useAddDeckMutation } from "../store";

function AddDeck({showInput, setShowInput}) {
   // const [showInput, setShowInput] = useState(false);
   const [currentValue, setCurrentValue] = useState('')
   const [addDeck, { data, isLoading, isError, error }] = useAddDeckMutation();


   

   const handleAddDeck = async (e) => {
      e.preventDefault();
      try {
         const newDeck = await addDeck(currentValue);
         setCurrentValue('')
         setShowInput(false)
      } catch (error) {
         console.log(error);
      }
   };


   if (showInput) {
      return (
         <form className="add-deck-form" onSubmit={handleAddDeck}>
            <input className="add-deck-form-input" autoFocus value={currentValue} onChange={(e) => setCurrentValue(e.target.value)}/>
         </form>
      );
   } else {
      return (
         <div className="add-deck">
            <button className="btn btn-outline-dark add-deck-btn" onClick={() => setShowInput(true)}>Add Deck</button>
         </div>
      );
   }
}

export default AddDeck;
