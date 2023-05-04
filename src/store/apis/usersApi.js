import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const usersApi = createApi({
   reducerPath: "users",
   baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:3000",
      //  credentials: 'include',
      prepareHeaders: (headers, { getState }) => {
         // const token = getState().auth.token
         const token = localStorage.getItem("jwt");
         if (token) {
            headers.set("Authorization", `Bearer ${token}`);
         }
         return headers;
      },
   }),
   endpoints(builder) {
      return {
         addUser: builder.mutation({
            query: (credentials) => {
               return {
                  url: "/users",
                  method: "POST",
                  body: {
                     ...credentials,
                  },
               };
            },
         }),
         loginUser: builder.mutation({
            query: (credentials) => {
               return {
                  url: "/users/login",
                  method: "POST",
                  body: {
                     ...credentials,
                  },
               };
            },
         }),
         fetchUsers: builder.query({
            query: () => {
               return {
                  url: "/users/me",
                  method: "GET",
               };
            },
         }),
         editUser: builder.mutation({
            query: (inputs) => {
                console.log(inputs)
                return {
                    url: '/users/me',
                    method: 'PATCH',
                    body: {
                        name: inputs.name, email: inputs.email, password: inputs.password
                    }
                }
            }
         }),
         addAvatar: builder.mutation({
            query: (file) => {
               const body = new FormData();
               body.append("Content-Type", file.type);
               body.append("avatar", file);
               return {
                  url: "/users/me/avatar",
                  method: "POST",
                  body,
               };
            },
         }),
      };
   },
});

export const {
   useFetchUsersQuery,
   useAddUserMutation,
   useLoginUserMutation,
   useAddAvatarMutation,
   useEditUserMutation,
} = usersApi;
export { usersApi };
