import { createSlice } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const cardSlice = createSlice({
    name: 'cards',
    initialState: {
        cards: null
    },
    reducers: {
        setCards: (state, action) => {
            state.cards = action.payload
        }
    }
})

export const { setCards } = cardSlice.actions;
export default cardSlice.reducer;
export const currentCards = (state) => state.cards.cards
