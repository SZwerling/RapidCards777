import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchDecksQuery, useFetchUsersQuery } from "../store";
import { setCards } from "../store/slices/cardSlice";
import { Link } from "react-router-dom";

import Header from "./Header";
import DisplayCards from "./DisplayCards";
import AddDeck from "./AddDeck";
import Deck from "./Deck";



const Home = () => {
   const [showInput, setShowInput] = useState(false);
   const dispatch = useDispatch();
   const { data: user, isLoading:userIsLoading, userError } = useFetchUsersQuery();
   const { data, isLoading, isSuccess, isError, error } = useFetchDecksQuery();
   

   

   let firstId;
   let show;
   let content;
   let clientName;

   if(userIsLoading){
      clientName = 'loading'
   } else if(userError){
      clientName = 'error'
   } else {
      clientName = user
   }

 
   
   
   

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
            <div style={{margin: "0 1rem 0 0"}}>
            Hello <Link state={clientName} to='/profile'>{clientName.name}</Link>
            </div>
           
            <AddDeck showInput={showInput} setShowInput={setShowInput} />
            {content}
         </Header>
         <DisplayCards />
      </div>
   );
};

export default Home;
