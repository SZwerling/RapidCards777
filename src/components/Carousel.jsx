import React, { useState, useEffect } from "react";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Carousel = ({ cards }) => {
   const [showBack, setShowBack] = useState(false);
   const [quick, setQuick] = useState({ transition: "transform: 1s" });

   useEffect(() => {
      setQuick({});
   }, [showBack]);

   if (cards) {
      const [index, setIndex] = useState(0);
      const length = cards.length;

      const handlePrevious = () => {
         showBack ? setQuick({ transition: "transform 0s" }) : setQuick({});
         const newIndex = index - 1;
         setIndex(newIndex < 0 ? length - 1 : newIndex);
         setShowBack(false);
      };

      const handleNext = () => {
         showBack ? setQuick({ transition: "transform 0s" }) : setQuick({});
         const newIndex = index + 1;
         setIndex(newIndex >= length ? 0 : newIndex);
         setShowBack(false);
      };

      const handleClick = () => {
         setShowBack(!showBack);
      };

      const count = length > 0 ? `${index + 1} / ${length}` : '-- / --'

      return (
         <div className="carousel-counter">
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
            <div className="count">
               {count}
            </div>
         </div>
      );
   } else {
      return;
   }
};

export default Carousel;
