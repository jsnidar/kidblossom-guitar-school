import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: '/', prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('jwt')

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
}),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getUser: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/get-current-user'
    })
  })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetUserQuery } = apiSlice

