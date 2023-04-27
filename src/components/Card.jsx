import { useRef, useState } from "react";
import React from "react";

const Card = ({ card, handleClick, showBack, quick }) => {

   if (card) {
      return (
         <div className="outer-card" onClick={handleClick}>
            <div className={"card " + (showBack ? "is-flipped" : "")} style={quick}>
               <div className="card-body card__face card__face--front">
                  {card.front}
               </div>
               <div className="card-body card__face card__face--back">
                  {card.back}
               </div>
            </div>
         </div>
      );
   } else {
      return (
         <div className="outer-card" onClick={handleClick}>
            <div className={"card " + (showBack ? "is-flipped" : "")} >
               <div className="card-body card__face card__face--front"> 
               </div>
               <div className="card-body card__face card__face--back">
               </div>
            </div>
         </div>
      );
   }
};

export default Card;
