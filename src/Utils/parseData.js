import { parseVideoDuration } from "./parseVideoDuration";
import axios from "axios";
import { convertRawtoString } from "./convertRawtoString";
import { timeSince } from "./timeSince";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const parseData = async (items) => {
  try {
    if (!items || !Array.isArray(items)) {
      console.warn('Invalid items data received:', items);
      return [];
    }

    const videoIds = items.map(item => item.id?.videoId || item.id).filter(Boolean);

 
    const videoDetailsResponse = await axios.get('https://youtube.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'contentDetails,statistics',
        id: videoIds.join(','),
        key: API_KEY
      }
    });

    const videoDetails = videoDetailsResponse.data.items || [];

    const parsedData = items.map((item, index) => {
      if (!item?.snippet) {
        console.warn('Missing snippet data for item:', item);
        return null;
      }

      const { snippet } = item;
      const details = videoDetails[index] || {};

      return {
        videoId: item.id?.videoId || item.id || '',
        title: snippet.title || '',
        description: snippet.description || '',
        thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || '',
        channelTitle: snippet.channelTitle || '',
        channelId: snippet.channelId || '',
        publishedAt: timeSince(new Date(snippet.publishedAt)) || 'Unknown time ago',
        duration: parseVideoDuration(details.contentDetails?.duration) || '0:00',
        views: convertRawtoString(details.statistics?.viewCount) || '0',
        likes: convertRawtoString(details.statistics?.likeCount) || '0'
      };
    }).filter(Boolean);

    return parsedData;
  } catch (error) {
    console.error("Error parsing video data:", error);
    return [];
  }
};