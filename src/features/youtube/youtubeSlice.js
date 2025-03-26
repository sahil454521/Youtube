import { createSlice } from "@reduxjs/toolkit";
import { getHomePageVideos } from "../../store/reducer/GetHomePageVideos";

const initialState = {
    videos: [],
    nextPageToken: null,
    loading: false
};

const youtubeSlice = createSlice({
    name: "youtubeApp",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHomePageVideos.pending, (state) => {
                state.loading = true;
            })
            .addCase(getHomePageVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.videos = action.payload.videos;
                state.nextPageToken = action.payload.nextPageToken;
            });
    }
});

export default youtubeSlice.reducer;