import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
      //  credentials: 'include',
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
            addUser: builder.mutation({
                query: credentials => {
                    return {
                        url: '/users',
                        method: 'POST',
                        body: {
                            ...credentials
                        }
                    }
                }
            }),
            loginUser: builder.mutation({
                query: credentials => {
                    return {
                        url: '/users/login',
                        method: 'POST',
                        body: {
                            ...credentials
                        }
                    }
                }
            }),
            fetchUsers: builder.query({
               // providesTags: ['user'],
                query: () => {
                    return {
                        url: '/users/me',
                        // params: {
                        //     query string for request
                        // },
                        method: 'GET',
                    }
                }
            })
        }
    }
});

export const { useFetchUsersQuery, useAddUserMutation, useLoginUserMutation } = usersApi;
export { usersApi };