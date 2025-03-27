import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseData } from "../../utils/parseData";  // Note: case-sensitive path

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

// Debug API key
console.log('API Key available:', !!API_KEY);

export const getHomePageVideos = createAsyncThunk(
    "youtube/App/searchPageVideos",
    async(isNext, {getState}) => {
        try {
            const {
                youtubeApp: {nextPageToken: nextPageTokenFromState, videos},
            } = getState();

            // Debug state
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

            // Debug API response
            console.log('API Response:', response.data);

            const items = response.data.items;
            const parsedData = await parseData(items);

            // Debug parsed data
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