import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  posts: [],
  status: "idle", //idle,sucees,failed,loading
  error: null,
};

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = axios.get(POST_URL);
    return response;
  } catch (error) {
    return error.message;
  }
});

export const addPosts = createAsyncThunk("posts/addPosts", async (params) => {
  try {
    const response = axios.post(POST_URL, params, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return response;
  } catch (error) {
    return error.message;
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: Date.now().toString(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: {
              like: 0,
              wow: 0,
              heart: 0,
              laugh: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { id, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        // let min = 1;
        const loadedPosts = action.payload.data.map((post) => {
          post.date = new Date().toISOString();
          post.reactions = {
            like: 0,
            wow: 0,
            heart: 0,
            laugh: 0,
          };
          return post;
        });
        state.posts = loadedPosts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPosts.fulfilled, (state, action) => {
        state.status = "success";
        action.payload.datauserId = Number(action.payload.userId);
        action.payload.data.date = new Date().toISOString();
        action.payload.data.reactions = {
          like: 0,
          wow: 0,
          heart: 0,
          laugh: 0,
        };
        // state.posts.push(action.payload);
        // console.log('action.payload.data',action.payload.data);
        state.posts = [...state.posts,action.payload.data];
        // console.log('state', current(state));
      });
  },
});

export const selectAllPosts = (state) => state.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export const { addPost, reactionAdded } = postSlice.actions;

export default postSlice.reducer;
