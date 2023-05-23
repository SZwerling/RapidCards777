import React, { useState, useEffect } from "react";
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
   showBack,
   setShowBack
}) => {
   const [editCard, { data, isLoading, isError, error }] =
      useEditCardMutation();


   const [quick, setQuick] = useState({ transition: "transform: 1s" });

   const handleSelect = (selectedIndex, e) => {
      showBack ? setQuick({ transition: "transform 0s" }) : setQuick({});
      setShowBack(false);
      setIndex(selectedIndex);
   };

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



      const handleClick = () => {
         setShowBack(!showBack);
      };

      const count = length > 0 ? <div className="counter">{index + 1} / {length}</div> : "-- / --";

      const renderedCards = cards.map((card) => {
         return (
            <Carousel.Item key={card._id}>
               <Card
                  card={card}
                  showBack={showBack}
                  handleClick={handleClick}
                  quick={quick}
               ></Card>
            </Carousel.Item>
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
                     spellCheck="false"
                     autoFocus="autoFocus"
                     onChange={(e) => setFront(e.target.value)}
                     value={front}
                     className="card-edit-1"
                     maxLength={"95"}
                  ></textarea>
                  <textarea
                     spellCheck="false"
                     onChange={(e) => setBack(e.target.value)}
                     value={back}
                     className="card-edit-2"
                     maxLength={"95"}
                  ></textarea>
               </form>
            </div>
         );
      } else {
         return (
            <div className="carousel-counter">
               <>
                  <Carousel
                     className="carousel"
                     activeIndex={index}
                     onSelect={handleSelect}
                     indicators={false}
                     interval={null}
                     touch={true}
                     controls={true}
                  >
                     {renderedCards}
                  </Carousel>
               </>
               {count}
            </div>
         );
      }
   } else {
      return (
        <div className="carousel-counter">
        <>
           <Carousel
              className="carousel"
              indicators={false}
              interval={null}
              touch={true}
              controls={true}
           >
             <Carousel.Item>
               <Card
               ></Card>
            </Carousel.Item>
           </Carousel>
        </>
        -- / --
     </div>
      );
   }
};

export default CarouselComp;


