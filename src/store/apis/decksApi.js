import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//"https://localhost:3000"
//"https://zwerling-flashcard-api.herokuapp.com"
const decksApi = createApi({
   reducerPath: "decks",
   baseQuery: fetchBaseQuery({
      baseUrl: "https://zwerling-flashcard-api.herokuapp.com",
      prepareHeaders: (headers, { getState }) => {
         //const token = getState().auth.token;
         const token = localStorage.getItem("jwt")
         if (token) {
            headers.set("Authorization", `Bearer ${token}`);
         }
         return headers;
      },
   }),
   endpoints(builder) {
      return {
         fetchDecks: builder.query({
            providesTags: ["Deck"],
            query: () => {
               return {
                  url: "/decks",
                  method: "GET",
               };
            },
         }),
         addDeck: builder.mutation({
            invalidatesTags: ["Deck"],
            query: (name) => {
               return {
                  url: `/decks/`,
                  body: {
                     name: name,
                  },
                  method: "POST",
               };
            },
         }),
         editDecks: builder.mutation({
            invalidatesTags: ["Deck"],
            query: (obj) => {
               return {
                  url: `/decks/${obj.id}`,
                  body: {
                     name: obj.name,
                  },
                  method: "PATCH",
               };
            },
         }),
         deleteDeck: builder.mutation({
            invalidatesTags: ["Deck", "Card"], //type: Card, id: deckId
            query: (id) => {
               return {
                  url: `/decks/${id}`,
                  method: "DELETE",
               };
            },
         }),
         fetchCards: builder.query({
            providesTags: ["Card"], //type: Card, id: deckId
            query: ({_id, sort}) => {
               return {
                  url: `/cards/${_id}`,
                  params: {
                     sortBy: sort
                  },
                  method: "GET",
               };
            },
         }),
         addCard: builder.mutation({
            invalidatesTags: ["Card"],
            query: (card) => {
               const { front, back, id } = card;
               return {
                  url: `/cards/${id}`,
                  body: {
                     front,
                     back,
                  },
                  method: "POST",
               };
            },
         }),
         editCard: builder.mutation({
            invalidatesTags: ["Card"],
            query: (card) => {
               const { front, back, id } = card;
               return {
                  url: `/cards/${id}`,
                  body: {
                     front,
                     back,
                  },
                  method: "PATCH",
               };
            },
         }),
         deleteCard: builder.mutation({
            invalidatesTags: ["Card"],
            query: (id) => {
               return {
                  url: `/cards/${id}`,
                  method: "DELETE",
               };
            },
         }),
      };
   },
});

export const {
   useFetchDecksQuery,
   useAddDeckMutation,
   useEditDecksMutation,
   useDeleteDeckMutation,
   useFetchCardsQuery,
   useAddCardMutation,
   useEditCardMutation,
   useDeleteCardMutation,
} = decksApi;
export { decksApi };


// params: {
//    userId: user.id
//    sortBy: user.sort //
// },

// user.sort = "front:asc" // "createdAt:asc"
