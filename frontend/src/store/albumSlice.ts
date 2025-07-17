import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import { Album } from "../types/models";

export const fetchAlbums = createAsyncThunk(
  "album/fetchAlbums",
  async (artistId: number) => {
    const response = await api.get(`/albums?artistId=${artistId}`);
    return response.data;
  }
);

const albumSlice = createSlice({
  name: "album",
  initialState: {
    albums: [] as Album[],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.albums = action.payload;
        state.loading = false;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default albumSlice.reducer;
