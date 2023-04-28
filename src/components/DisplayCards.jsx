import React from "react";
import { useSelector } from "react-redux";
import { useFetchCardsQuery } from "../store";
import Carousel from "./Carousel";
import AddCard from "./AddCard";

function DisplayCards() {
   let _id = useSelector((state) => state.cardReducer.cards);
   const { data, isLoading, isSuccess, isError, error } =
      useFetchCardsQuery(_id);

   let content;
   if (isLoading) {
      console.log(isLoading)
      content = "is loading";
   } else if (error) {
      console.log(error)
      content = <Carousel />;
   } else {
      let cards = data.map((card) => {
         return { front: card.front, back: card.back, _id: card._id };
      });
      content = <Carousel cards={cards} />;
   }
   return (
      <div className="display">
         <div className="choices">
            <AddCard />
            <div>Alphabetcially</div>
            <div>Chronologically</div>
            <div>Most Recent</div>
         </div>
         <div className="card-content">{content}</div>
      </div>
   );
}

export default DisplayCards;
