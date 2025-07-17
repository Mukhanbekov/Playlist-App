import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import { Artist } from "../types/models";

export const fetchArtists = createAsyncThunk(
  "artist/fetchArtists",
  async () => {
    const response = await api.get("/artists");
    return response.data;
  }
);

const artistSlice = createSlice({
  name: "artist",
  initialState: {
    artists: [] as Artist[],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.artists = action.payload;
        state.loading = false;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default artistSlice.reducer;
