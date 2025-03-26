import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
    'youtubeApp/homePageVideos',
    async(isNext, {getState}) => {
        const {youtubeApp: {nextPageToken: nextPageTokenFromState}} = getState();
        const response = await axios.get('https://youtube.googleapis.com/youtube/v3/videos', {
            params: {
                part: 'snippet',
                chart: 'mostPopular',
                regionCode: 'IN',
                maxResults: 10,
                pageToken: isNext ? nextPageTokenFromState : '',
                key: API_KEY,
            },
        });
        
        return {
            videos: response.data.items,
            nextPageToken: response.data.nextPageToken
        };
    }
);