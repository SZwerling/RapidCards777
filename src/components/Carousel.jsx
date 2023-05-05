import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useEditCardMutation } from "../store";
import Carousel from "react-bootstrap/Carousel";
import Card from "./Card";

const CarouselComp = ({
   cards,
   edit,
   setEdit,
   index,
   setIndex,
   front,
   setFront,
   back,
   setBack,
}) => {
   const [editCard, { data, isLoading, isError, error }] =
      useEditCardMutation();

   const [showBack, setShowBack] = useState(false);
   const [quick, setQuick] = useState({ transition: "transform: 1s" });

   useEffect(() => {
      setQuick({});
   }, [showBack]);

   if (cards?.length > 0) {
      const length = cards.length;
      const id = cards[index]?._id;

      const handleSubmitEdit = () => {
         const editObject = { front, back, id };
         editCard(editObject);
         setEdit(false);
      };

      const handlePrevious = () => {
         showBack ? setQuick({ transition: "transform 0s" }) : setQuick({});
         const newIndex = index - 1;
         setIndex(newIndex < 0 ? length - 1 : newIndex);
         setFront(
            newIndex < 0 ? cards[length - 1].front : cards[newIndex].front
         );
         setBack(newIndex < 0 ? cards[length - 1].back : cards[newIndex].back);
         setShowBack(false);
      };

      const handleNext = () => {
         showBack ? setQuick({ transition: "transform 0s" }) : setQuick({});
         const newIndex = index + 1;
         setIndex(newIndex >= length ? 0 : newIndex);
         setFront(newIndex >= length ? cards[0].front : cards[newIndex].front);
         setBack(newIndex >= length ? cards[0].back : cards[newIndex].back);
         setShowBack(false);
      };

      const handleClick = () => {
         setShowBack(!showBack);
      };

      const count = length > 0 ? `${index + 1} / ${length}` : "-- / --";

      console.log(cards)

      const renderedCards = cards.map((card) => {
         return (
                <Card key={card._id}
                        card={card}
                        showBack={showBack}
                        handleClick={handleClick}
                        quick={quick}
                        
                     ></Card>
         );
      });

     

      if (edit) {
         return (
            <div className="card-edit-container">
               <button className="btn-edit" onClick={handleSubmitEdit}>
                  submit
               </button>
               <form className="card-edit">
                  <textarea
                     onChange={(e) => setFront(e.target.value)}
                     value={front}
                     className="card-edit-1"
                  ></textarea>
                  <textarea
                     onChange={(e) => setBack(e.target.value)}
                     value={back}
                     className="card-edit-2"
                  ></textarea>
               </form>
            </div>
         );
      } else {
         return <Carousel>{renderedCards}</Carousel>;
      }
   } else {
      return (
         <div className="carousel-counter">
            <div className="carousel">
               <FaAngleLeft />
               <div className="card-container">
                  <Card></Card>
               </div>
               <FaAngleRight />
            </div>
            <div className="count">-- / --</div>
         </div>
      );
   }
};

export default CarouselComp;

{
   /* <div className="carousel-counter">
               <div className="carousel">
                  <FaAngleLeft onClick={handlePrevious} />
                  <div className="card-container" >
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
            </div> */
}
