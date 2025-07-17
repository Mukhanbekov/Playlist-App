import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
import { Track } from '../types/models';

export const fetchTracks = createAsyncThunk(
  'tracks/fetchTracks',
  async (albumId: number) => {
    const response = await api.get(`/tracks?albumId=${albumId}`);
    return response.data;
  }
);

interface TrackState {
  tracks: Track[];
  loading: boolean;
}

const initialState: TrackState = {
  tracks: [],
  loading: false,
};

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTracks.fulfilled, (state, action) => {
      state.loading = false;
      state.tracks = action.payload;
    });
    builder.addCase(fetchTracks.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default trackSlice.reducer;
