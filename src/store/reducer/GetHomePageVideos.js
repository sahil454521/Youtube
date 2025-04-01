import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseData } from "../../Utils/parseData";  

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

console.log('API Key available:', !!API_KEY);

export const getHomePageVideos = createAsyncThunk(
    "youtube/App/searchPageVideos",
    async(isNext, {getState}) => {
        try {
            const {
                youtubeApp: {nextPageToken: nextPageTokenFromState, videos},
            } = getState();

            console.log('Current state:', { nextPageToken: nextPageTokenFromState, videosCount: videos.length });

            const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search`, {
                params: {
                    maxResults: 20,
                    q: "drop x out",
                    key: API_KEY,
                    part: "snippet",
                    type: "video",
                    pageToken: isNext ? nextPageTokenFromState : ""
                }
            });

            console.log('API Response:', response.data);

            const items = response.data.items;
            const parsedData = await parseData(items);

            console.log('Parsed Data:', parsedData);

            return {
                parsedData: [...videos, ...parsedData],
                nextPageToken: response.data.nextPageToken
            };
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
);
