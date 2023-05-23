import React, { useState } from "react";
import { useAddDeckMutation } from "../store";

function AddDeck({showInput, setShowInput, show}) {
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
            <input spellCheck="false" className="add-deck-form-input add-deck-component" autoFocus value={currentValue} onChange={(e) => setCurrentValue(e.target.value)}/>
            {show && (<span> &#x270E; add your first deck</span>)}
         </form>
      );
   } else {
      return (
         <div className="add-deck add-deck-component">
            <button className="btn add-deck-btn" onClick={() => setShowInput(true)}>Add Deck</button>
         </div>
      );
   }
}

export default AddDeck;
