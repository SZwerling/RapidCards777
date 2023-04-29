import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetchDecksQuery } from "../store";
import { setCards } from "../store/slices/cardSlice";

import Header from "./Header";
import DisplayCards from "./DisplayCards";
import AddDeck from "./AddDeck";
import Deck from "./Deck";



const Home = () => {
   const [showInput, setShowInput] = useState(false);

   const dispatch = useDispatch();

   const { data, isLoading, isSuccess, isError, error } = useFetchDecksQuery();

   let firstId;
   let show;

   let content;
   if (isLoading) {
      content = "";
   } else if (error) {
      content = "";
   } else {
      let decks = data;
      if (decks.length > 0) {
         firstId = decks[0]._id;
         content = decks.map((deck) => {
            return <Deck key={deck._id} _id={deck._id} deck={deck} />;
         });
      } else {
         show = true;
         content = <div>&lt;--add your first deck</div>;
      }
   }

   useEffect(() => {
      if (firstId) {
         dispatch(setCards(firstId));
      }
   }, [firstId]);

   useEffect(() => {
      if (show) {
         setShowInput(true);
      }
   }, [show]);

   return (
      <div className="home-container">
         <Header>
            <AddDeck showInput={showInput} setShowInput={setShowInput} />
            {content}
         </Header>
         <DisplayCards />
      </div>
   );
};

export default Home;
