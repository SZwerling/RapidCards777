import React, { useState } from "react";
import { setCards } from "../store/slices/cardSlice";
import { useDispatch, useSelector } from "react-redux";
// import { GrEdit, GrTrash } from "react-icons/Gr";
import { useEditDecksMutation, useDeleteDeckMutation } from "../store";


function Deck({ deck, setIndex, setShowBack, index, setShowAddCard, setEdit, setCurrentDeck }) {
   const [showEdit, setShowEdit] = useState(false);
   const [value, setValue] = useState("");

   let selectedId = useSelector((state) => state.cardReducer.cards);


   const [editDeck, { data, isLoading, isError, error }] = useEditDecksMutation();
   const [deleteDeck, { deletData, deleteIsLoading, deleteIsError, deleteError }] = useDeleteDeckMutation();
   const dispatch = useDispatch();

   const handleClick = (_id) => {
      dispatch(setCards(_id));
      // setIndex(index * 0)
      setShowBack(false)
      setShowAddCard(false)
      setEdit(false)
      setCurrentDeck(_id)
   };

   const handleDelete = (_id) => {
      deleteDeck(_id);
      // setIndex(index * 0)
   };

   const handleShowEdit = () => {
      setShowEdit(true);
   };

   const handleEditSubmit = async (e) => {
      e.preventDefault();
      try {
         const edit = { id: deck._id, name: value };
         const returnedEdit = await editDeck(edit);
         console.log(returnedEdit);
         setValue("");
         setShowEdit(false);
      } catch (error) {
         console.log(error);
      }
   };

   const textColor = selectedId === deck._id ? 'white' : '' 

   if (showEdit) {
      return (
         <form onSubmit={handleEditSubmit}>
            <input
               spellCheck="false"
               autoFocus
               placeholder={deck.name}
               value={value}
               onChange={(e) => setValue(e.target.value)}
            />
         </form>
      );
   } else {
      return (
         <div className="deck">
            {selectedId === deck._id ? (
               <div
                  className="deck-icon"
                  onClick={() => handleShowEdit(deck._id)}
               >&#128393;</div>
            ) : (
               ""
            )}

            <div className="deck-name" style={{color: textColor}} onClick={() => handleClick(deck._id)}>
               {deck.name}
            </div>
            {selectedId === deck._id ? (
               <div 
                  className="deck-icon"
                  onClick={() => handleDelete(deck._id)}
               >&#128465;</div>
            ) : (
               ""
            )}
         </div>
      );
   }
}

export default Deck;
