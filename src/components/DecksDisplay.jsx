import React from 'react'
import Deck from './Deck';
import { useFetchDecksQuery } from '../store';

function DecksDisplay() {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
 } = useFetchDecksQuery();

 let content;
 if (isLoading) {
    content = "is loading";
 } else if (error) {
    content = "error";
 } else {
    let decks = data;
    content = decks.map((deck) => {
      return <Deck key={deck._id} _id={deck._id} deck={deck}/>
    })
 }
 
 return content
 
}

export default DecksDisplay;