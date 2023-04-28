import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const decksApi = createApi({
   reducerPath: "decks",
   baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:3000",
      prepareHeaders: (headers, { getState }) => {
         const token = getState().auth.token;
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
            query: (_id) => {
               return {
                  url: `/cards/${_id}`,
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
