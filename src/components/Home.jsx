import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetchDecksQuery } from "../store";
import { setCards } from "../store/slices/cardSlice";
import { Link } from "react-router-dom";
import emptyAvatar from "../assets/empty-avatar.jpg";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";

import Header from "./Header";
import DisplayCards from "./DisplayCards";
import AddDeck from "./AddDeck";
import Deck from "./Deck";
import fetchUser from "./FetchUser";

const Home = () => {
   const [showInput, setShowInput] = useState(false);
   const dispatch = useDispatch();

   const { data, isLoading, isSuccess, isError, error } = useFetchDecksQuery();

   let firstId;
   let show;
   let content;


   let clientName = fetchUser()

   if (isLoading) {
      content = "";
   } else if (error) {
      content = "";
   } else {
      let decks = data;
      if (decks.length > 0) {
         firstId = decks[0]._id;
         content = decks.map((deck) => {
            return (
               <Nav.Item key={deck._id}>
                  <Deck _id={deck._id} deck={deck} />
               </Nav.Item>
            );
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

   const onImageError = (e) => {
      e.target.src = emptyAvatar;
   };

   return (
      <>
         <Header>
            <Container>
               <Navbar.Brand>
                  {" "}
                  <img
                     src={`http://localhost:3000/users/${clientName._id}/avatar`}
                     className="rounded-circle d-inline-block align-top avatar"
                     // style={{ width: 10 }}
                     alt="Avatar"
                     onError={onImageError}
                  />
               </Navbar.Brand>
               <Nav.Item>
                  <Link className="link" state={clientName} to="/profile">
                     {clientName.name}
                  </Link>
               </Nav.Item>

               <Navbar.Toggle
                  style={{ fontSize: ".8rem" }}
                  aria-controls="basic-navbar-nav"
               />
               <Navbar.Collapse id="basic-navbar-nav">
                  <AddDeck showInput={showInput} setShowInput={setShowInput} />
                  <div className="d-flex flex-wrap">{content}</div>
               </Navbar.Collapse>
            </Container>
         </Header>
         {clientName==='error' && (
            <Modal
               show
               style={{ fontSize: "4rem" }}
               size="md"
               aria-labelledby="contained-modal-title-vcenter"
               centered
            >
               <Modal.Body>
                  <h4>401 Not Authorized</h4>
                  <Link style={{textDecoration: "none"}} to={"/welcome"}>Please Log In.</Link>
               </Modal.Body>
            </Modal>
         )}
         <DisplayCards />
      </>
   );
};

export default Home;
