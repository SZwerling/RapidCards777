import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from "react-redux";
import {
   useFetchCardsQuery,
   useDeleteCardMutation,
   useAddCardMutation,
} from "../store";
import Row from "react-bootstrap/Row";
import CarouselComp from "./CarouselComp";
import Carousel from "react-bootstrap/Carousel";
import Card from "./Card";
import NewCard from "./NewCard";
import LoadingCarousel from "./LoadingCarousel";

function DisplayCards({index, setIndex, showBack, setShowBack, showAddCard, setShowAddCard, edit, setEdit}) {
   // const [edit, setEdit] = useState(false);
   
   // const [showAddCard, setShowAddCard] = useState(false);
   const [front, setFront] = useState("");
   const [newFront, setNewFront] = useState("");
   const [back, setBack] = useState("");
   const [newBack, setNewBack] = useState("");
   const [sort, setSort] = useState("");


   
   const [
      deleteCard,
      { deleteData, deleteIsLoading, deleteIsError, deleteError },
   ] = useDeleteCardMutation();
   const [addCard, { addData, addIsLoading, addIsError, addError }] =
      useAddCardMutation();

   let _id = useSelector((state) => state.cardReducer.cards);
   let fetchCardsObject = { _id: _id, sort: sort };

   const { data, isLoading, isSuccess, refetch, isError, error } =
      useFetchCardsQuery(fetchCardsObject);

   let cards;

   const handleEdit = () => {
      setBack(cards[index].back);
      setFront(cards[index].front);
      setEdit(true);
   };

   const handleAddCard = async (id) => {
      if (newFront && newBack) {
         const cardObj = {
            front: newFront,
            back: newBack,
            id,
         };
         addCard(cardObj);
         setShowAddCard(false);
         setNewBack("");
         setNewFront("");
         if (sort === "front:asc") {
            setIndex(0);
         } else {
            setIndex(cards.length);
         }
      } else {
         setNewBack("");
         setNewFront("");
         setShowAddCard(false);
      }
   };

   const handleDelete = () => {
      deleteCard(cards[index]._id);
      const newIndex = index - 1;
      setIndex(newIndex < 0 ? cards.length - 2 : newIndex);
      setShowBack(false)
   };

   const handleSortAlph = () => {
      setSort("front:asc");
      setIndex(0);
      setFront(cards[index].front);
      setBack(cards[index].back);
      setShowBack(false)
   };

   const handleSortRecent = () => {
      setSort("createdAt:des");
      setIndex(0);
      setFront(cards[index].front);
      setBack(cards[index].back);
      setShowBack(false)
   };


   let content;
   if (isLoading) {
      content = <LoadingCarousel />;
   } else if (error) {
      content = <CarouselComp showBack={showBack} setShowBack={setShowBack} />;
   } else {
      cards = data.map((card) => {
         return { front: card.front, back: card.back, _id: card._id };
      });
      if(cards.length < 1) {
         content = (
            <div className="carousel-counter">
        <>
           <CarouselComp
              showBack={showBack} 
              setShowBack={setShowBack} 
              className="carousel"
              indicators={false}
              interval={null}
              touch={true}
              controls={true}
           >
             <Carousel.Item>
               <Card></Card>
            </Carousel.Item>
           </CarouselComp>
        </>
     </div>
         )
      } else {
         content = (
            <CarouselComp
               showBack={showBack} 
               setShowBack={setShowBack} 
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
      <div
         className="container-fluid"
         style={{ backgroundColor: "#F4F4F4", color: "#333333" }}
      >
         <Row>
            <div className="col-md-2 col-lg-1">
               <div className="dropdown" id="dropdown1">
                  <button className="btn btn-primary dropdown-toggle" type="button" id="#dropdown-basic-button-1" data-bs-toggle="dropdown" aria-expanded="false">
                  Select
               </button>
               <ul className="dropdown-menu" aria-labelledby="#dropdown-basic-button-1">
                     <li className="dropdown-item" onClick={() => setShowAddCard(true)}>New Card</li>
                  {data?.length > 0 ? (
                     <>
                        <li className="dropdown-item" onClick={handleEdit}>Edit</li>
                        <li className="dropdown-item" onClick={handleDelete}>Delete</li>
                        <li className="dropdown-item" onClick={handleSortAlph}>Alphabetcially</li>
                        <li className="dropdown-item" onClick={handleSortRecent}>Chronologically</li>
                     </>
               ) : (
                  <ul></ul>
               )}
                  </ul>
               </div>
               <div className="alt-choices">
                  <div className="alt-choice" onClick={() => setShowAddCard(true)}><a style={{color: "#333333", position: "relative", zIndex: 20}} className="alt-choice-link">New Card</a></div>
                  {data?.length > 0 ? (
                  <>
                     <div className="alt-choice" onClick={handleEdit}><a className="alt-choice-link" style={{color: "#333333", position: "relative", zIndex: 20}}>Edit</a></div>
                     <div className="alt-choice" onClick={handleDelete}><a style={{color: "#333333", position: "relative", zIndex: 20}}>Delete</a></div>
                     <div className="alt-choice" onClick={handleSortAlph}><a style={{color: "#333333", position: "relative", zIndex: 20}}>Alphabetcially</a></div>
                     <div className="alt-choice" onClick={handleSortRecent}><a style={{color: "#333333", position: "relative", zIndex: 20}}>Chronologically</a></div>
                  </>
                  ) : (
                     <div></div>
                  )}
               </div>
            </div>
            <div className="col">{content}</div>
         </Row>
      </div>
   );
}

export default DisplayCards;

//  <AddCard setBack={setBack} setFront={setFront} handleAddCard={handleAddCard} _id={_id}/>
//




