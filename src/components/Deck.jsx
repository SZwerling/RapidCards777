import React, { useState } from "react";
import { setCards } from "../store/slices/cardSlice";
import { useDispatch, useSelector } from "react-redux";
import { GrEdit, GrTrash } from "react-icons/Gr";
import { useEditDecksMutation } from "../store";
import { useDeleteDeckMutation } from "../store";

function Deck({ deck }) {
   const [showEdit, setShowEdit] = useState(false);
   const [value, setValue] = useState("");

   let selectedId = useSelector((state) => state.cardReducer.cards);

   const [editDeck, { data, isLoading, isError, error }] =
      useEditDecksMutation();
   const [
      deleteDeck,
      { deletData, deleteIsLoading, deleteIsError, deleteError },
   ] = useDeleteDeckMutation();
   const dispatch = useDispatch();

   const handleClick = (_id) => {
      dispatch(setCards(_id));
      //album id going to cardsSlice
   };

   const handleDelete = (_id) => {
      deleteDeck(_id);
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

   if (showEdit) {
      return (
         <form onSubmit={handleEditSubmit}>
            <input
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
               <GrEdit
                  className="deck-icon"
                  onClick={() => handleShowEdit(deck._id)}
               />
            ) : (
               ""
            )}

            <div className="deck-name" onClick={() => handleClick(deck._id)}>
               {deck.name}
            </div>
            {selectedId === deck._id ? (
               <GrTrash
                  className="deck-icon"
                  onClick={() => handleDelete(deck._id)}
               />
            ) : (
               ""
            )}
         </div>
      );
   }
}

export default Deck;
