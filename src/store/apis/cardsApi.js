import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cardsApi = createApi({
    reducerPath: 'cards',
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
            fetchCards: builder.query({
                providesTags: ['Card'], //type: Card, id: deckId
                query: (_id) => {
                    return {
                        url: `/cards/${_id}`,
                        method: 'GET',
                    }
                }
            }),
            addCard: builder.mutation({
                invalidatesTags: ['Card'],
                query: (card) => {
                    console.log(card)
                    const {front, back, id} = card
                    return {
                        url: `/cards/${id}`,
                        body: {
                            front, back
                        },
                        method: 'POST',
                    }   
                }
            })
        }
    }
})

export const { useFetchCardsQuery, useAddCardMutation } = cardsApi;
export { cardsApi };
