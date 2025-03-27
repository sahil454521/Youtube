import { createSlice } from "@reduxjs/toolkit";
import { getHomePageVideos } from "../../store/reducer/GetHomePageVideos";

const initialState = {
    videos: [],
    nextPageToken: null,
    loading: false,
    error: null
};

export const youtubeSlice = createSlice({
    name: "youtubeApp",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHomePageVideos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHomePageVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.videos = action.payload.parsedData;
                state.nextPageToken = action.payload.nextPageToken;
                state.error = null;
            })
            .addCase(getHomePageVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default youtubeSlice.reducer;