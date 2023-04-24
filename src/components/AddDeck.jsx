import React from "react";
import { useState } from "react";
import { useAddDeckMutation } from "../store";

function AddDeck() {
   const [showInput, setShowInput] = useState(false);
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
         <form onSubmit={handleAddDeck}>
            <input autoFocus value={currentValue} onChange={(e) => setCurrentValue(e.target.value)}/>
         </form>
      );
   } else {
      return (
         <div className="add-deck">
         
            <button onClick={() => setShowInput(true)}>add deck</button>
         </div>
      );
   }
}

export default AddDeck;
