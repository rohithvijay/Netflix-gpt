import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResults: null,
    movieNames: null,
  },
  reducers: {
    toggleGptSearchView: (state, action) => {
      state.showGptSearch = action.payload;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    clearGptSearchResult: (state) => {
      state.movieNames = null;
      state.movieResults = null;
    }
  },
});

export const { toggleGptSearchView, addGptMovieResult, clearGptSearchResult } = gptSlice.actions;

export default gptSlice.reducer;
