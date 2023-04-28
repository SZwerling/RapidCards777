import React, { useState, useEffect } from "react";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useEditCardMutation } from "../store";

const Carousel = ({ cards }) => {
   const [editCard, { data, isLoading, isError, error }] = useEditCardMutation();
   const [showBack, setShowBack] = useState(false);
   const [quick, setQuick] = useState({ transition: "transform: 1s" });
   const [edit, setEdit] = useState(false);
   const [index, setIndex] = useState(0);
   const [front, setFront] = useState('')
   const [back, setBack] = useState('')
   
   

   useEffect(() => {
      setQuick({});
   }, [showBack]);

   const handleEdit = () => {
      if(cards.length > 0){
         setFront(cards[index].front)
         setBack(cards[index].back)
      }
      setEdit(!edit);
   };
  

   if (cards && cards.length > 0) {
    
      const length = cards.length;
      const id = cards[index]._id

      const handleSubmitEdit = () => {
         const editObject = {front, back, id}
         editCard(editObject)
         setEdit(false)
      }
      

      const handlePrevious = () => {
         showBack ? setQuick({ transition: "transform 0s" }) : setQuick({});
         const newIndex = index - 1;
         setIndex(newIndex < 0 ? length - 1 : newIndex);
         setFront(newIndex < 0 ? cards[length-1].front : cards[newIndex].front)
         setBack(newIndex < 0 ? cards[length-1].back : cards[newIndex].back)
         setShowBack(false);
      };

      const handleNext = () => {
         showBack ? setQuick({ transition: "transform 0s" }) : setQuick({});
         const newIndex = index + 1;
         setIndex(newIndex >= length ? 0 : newIndex);
         setFront(newIndex >= length ? cards[0].front : cards[newIndex].front)
         setBack(newIndex >= length ? cards[0].back : cards[newIndex].back) 
         setShowBack(false);
      };

      const handleClick = () => {
         setShowBack(!showBack);
      };

      const count = length > 0 ? `${index + 1} / ${length}` : "-- / --";

      if (edit) { 
         return (
            <div className="card-edit-container">
               <button className="btn-edit" onClick={handleSubmitEdit}>submit</button>
               <form className="card-edit">
                  <textarea onChange={(e) => setFront(e.target.value)} value={front} className="card-edit-1"></textarea>
                  <textarea onChange={(e) => setBack(e.target.value)} value={back} className="card-edit-2"></textarea>
               </form>
            </div>
         );
      } else {
         return (
            <div className="carousel-counter">
               <button className="btn-edit" onClick={handleEdit}>edit</button>
               <div className="carousel">
                  <FaAngleLeft onClick={handlePrevious} />
                  <div className="card-container">
                     <Card
                        card={cards[index]}
                        showBack={showBack}
                        handleClick={handleClick}
                        quick={quick}
                     ></Card>
                  </div>
                  <FaAngleRight onClick={handleNext} />
               </div>
               <div className="count">{count}</div>
            </div>
         );
      }
   } else {
      return (
         <div className="carousel-counter">
            <div className="carousel">
               <FaAngleLeft />
               <div className="card-container">
                  <Card
                  // card={cards[index]}
                  // showBack={showBack}
                  // handleClick={handleClick}
                  // quick={quick}
                  ></Card>
               </div>
               <FaAngleRight />
            </div>
            <div className="count">-- / --</div>
         </div>
      );
   }
};

export default Carousel;
