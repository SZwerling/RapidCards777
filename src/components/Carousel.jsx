import React, { useState } from "react";
import Card from "./Card";
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi'

const Carousel = ({ cards }) => {
   if (cards) {
      const [index, setIndex] = useState(0);
      const length = cards.length;

      const handlePrevious = () => {
         const newIndex = index - 1;
         setIndex(newIndex < 0 ? length - 1 : newIndex);
      };

      const handleNext = () => {
         const newIndex = index + 1;
         setIndex(newIndex >= length ? 0 : newIndex);
      };

      return (
         <div className="carousel">
            <button className="carousel-button" onClick={handlePrevious}><BiLeftArrow /></button>
            <div className="card-container">
            <Card card={cards[index]}></Card>
            </div>
            <button className="carousel-button" onClick={handleNext}><BiRightArrow /></button>
         </div>
      );
   } else {
      return;
   }
};

export default Carousel;
