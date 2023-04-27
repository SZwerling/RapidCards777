import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const decksApi = createApi({
    reducerPath: 'decks',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
         prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if(token){
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints(builder) {
        return {
            fetchDecks: builder.query({
                providesTags: ['Deck'],
                query: () => {
                    return {
                        url: '/decks',
                        method: 'GET',
                    }
                }
            }),
            addDeck: builder.mutation({
                invalidatesTags: ['Deck'],
                query: (name) => {
                    return {
                        url: `/decks/`,
                        body: {
                            name: name,
                        },
                        method: 'POST'
                    }
                }
            }),
            editDecks: builder.mutation({
                invalidatesTags: ['Deck'],
                query: (obj) => {
                    return {
                        url: `/decks/${obj.id}`,
                        body: {
                            name: obj.name
                        },
                        method: 'PATCH'
                    }
                }
            }),
            deleteDeck: builder.mutation({
                invalidatesTags: ['Deck'], //type: Card, id: deckId
                query: (id) => {
                    return {
                        url: `/decks/${id}`,
                        method: 'DELETE'
                    }
                }
            })
        }
    }
})

export const { useFetchDecksQuery, useAddDeckMutation, useEditDecksMutation, useDeleteDeckMutation } = decksApi;
export { decksApi };