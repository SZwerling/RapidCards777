import React from "react";
import DecksDisplay from "./DecksDisplay";
import Header from "./Header";
import DisplayCards from "./DisplayCards";
import AddDeck from "./AddDeck";

const Home = () => {
   return (
      <div className="home-container">
         <Header>
            <AddDeck />
            <DecksDisplay />
         </Header>
         <DisplayCards />
      </div>
   );
};

export default Home;
