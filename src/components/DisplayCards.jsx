import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
   useFetchCardsQuery,
   useDeleteCardMutation,
   useAddCardMutation,
} from "../store";
import Carousel from "./Carousel";
import NewCard from "./NewCard";
import LoadingCarousel from "./LoadingCarousel";


function DisplayCards() {
   const [edit, setEdit] = useState(false);
   const [index, setIndex] = useState(0);
   const [showAddCard, setShowAddCard] = useState(false);
   const [front, setFront] = useState('');
   const [newFront, setNewFront] = useState('');
   const [back, setBack] = useState('');
   const [newBack, setNewBack] = useState('');
   const [sort, setSort] = useState('');
   const [
      deleteCard,
      { deleteData, deleteIsLoading, deleteIsError, deleteError },
   ] = useDeleteCardMutation();
   const [addCard, { addData, addIsLoading, addIsError, addError }] =
      useAddCardMutation();

   let _id = useSelector((state) => state.cardReducer.cards);
   let fetchCardsObject = {_id: _id, sort: sort}

   const { data, isLoading, isSuccess, isError, error } =
      useFetchCardsQuery(fetchCardsObject);

      let cards;
   
   const handleEdit = () => {
      setBack(cards[index].back)
      setFront(cards[index].front)
      setEdit(true);
   };

   const handleAddCard = async (id) => {
      const cardObj = {
         front: newFront,
         back: newBack,
         id,
      };
      addCard(cardObj);
      setShowAddCard(false);
      setNewBack("");
      setNewFront("");
      if(sort === "front:asc"){
         setIndex(0)
      } else {
         setIndex(cards.length)
      }
   };

   const handleDelete = () => {
      deleteCard(cards[index]._id);
      const newIndex = index - 1;
      setIndex(newIndex < 0 ? cards.length - 2 : newIndex);
   };

   const handleSortAlph = () => {
      setSort("front:asc");
      setIndex(0);
      setFront(cards[index].front)
      setBack(cards[index].back)
   };

   const handleSortRecent = () => {
      setSort("createdAt:asc");
      setIndex(0);
      setFront(cards[index].front)
      setBack(cards[index].back)
   }

   let content;
   if (isLoading) {
      content = <LoadingCarousel />;
   } else if (error) {
      
      content = <Carousel />;
   } else {
      cards = data.map((card) => {
         return { front: card.front, back: card.back, _id: card._id };
      });
      content = (
         <Carousel
            cards={cards}
            edit={edit}
            setEdit={setEdit}
            index={index}
            setIndex={setIndex}
            front={front}
            setFront={setFront}
            back={back}
            setBack={setBack}
         />
      );
   }

  
   

   if (showAddCard) {
      content = (
         <NewCard
            setNewBack={setNewBack}
            setNewFront={setNewFront}
            newBack={newBack}
            newFront={newFront}
            handleAddCard={handleAddCard}
            _id={_id}
            
         />
      );
   }

   
   return (
      <div className="display">
         <div className="choices">
            <div onClick={() => setShowAddCard(!showAddCard)}>New Card</div>
            {data?.length > 0 ? (
               <div onClick={handleEdit}>Edit</div>
            ) : (
               <div></div>
            )}
            <div onClick={handleDelete}>Delete</div>
            <div onClick={handleSortAlph}>Alphabetcially</div>
     
            <div onClick={handleSortRecent}>Most Recent</div>
         </div>
         <div className="card-content">{content}</div>
      </div>
   );
}

export default DisplayCards;

//  <AddCard setBack={setBack} setFront={setFront} handleAddCard={handleAddCard} _id={_id}/>
//
