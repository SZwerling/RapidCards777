import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { usersApi } from "./apis/usersApi";
import { decksApi } from "./apis/decksApi";
// import { cardsApi } from "./apis/cardsApi";
import authReducer from "./slices/authSlice";
import cardReducer from "./slices/cardSlice";

const store = configureStore({
   reducer: {
      // decks: decksReducer,
      [usersApi.reducerPath]: usersApi.reducer,
      [decksApi.reducerPath]: decksApi.reducer,
      // [cardsApi.reducerPath]: cardsApi.reducer,
      auth: authReducer,
      cardReducer,
   },
   middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
         .concat(usersApi.middleware)
         .concat(decksApi.middleware);
      // .concat(cardsApi.middleware);
   },
});

setupListeners(store.dispatch);

export { store };

export {
   useFetchUsersQuery,
   useFetchAvatarQuery,
   useAddUserMutation,
   useLoginUserMutation,
   useLogoutUserMutation,
   useLogoutUserAllMutation,
   useDeleteAccountMutation,
   useAddAvatarMutation,
   useEditUserMutation,
   useRequestPasswordMutation,
   useResetPasswordMutation,
} from "./apis/usersApi";
export {
   useFetchDecksQuery,
   useAddDeckMutation,
   useEditDecksMutation,
   useDeleteDeckMutation,
   useFetchCardsQuery,
   useAddCardMutation,
   useEditCardMutation,
   useDeleteCardMutation,
} from "./apis/decksApi";
// export { useFetchCardsQuery, useAddCardMutation } from "./apis/cardsApi";
