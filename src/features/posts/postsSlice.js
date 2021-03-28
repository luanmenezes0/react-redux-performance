import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { client } from '../../app/client';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await client.get('https://jsonplaceholder.typicode.com/posts');
    return response;
  },
  {
    condition: (_, { getState }) => {
      const { posts } = getState();
      const fetchStatus = posts.status;
      if (fetchStatus === 'succeeded' || fetchStatus === 'loading') {
        return false;
      }
    },
  },
);

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find(({ id }) => id === postId);

      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
      payload.forEach((post) => state.posts.push(post));
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
