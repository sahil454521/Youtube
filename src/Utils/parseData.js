import axios from 'axios';
import { parseVideoDuration } from './parseVideoDuration';
import { convertRawtoString } from './convertRawtoString';
import { timeSince } from './timeSince';

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const parseData = async (items) => {
  try {
    if (!items || !Array.isArray(items)) {
      console.warn('Invalid items data received:', items);
      return [];
    }

    const videoIds = items.map(item => item.id?.videoId || item.id).filter(Boolean);
    const channelIds = items.map(item => item.snippet?.channelId).filter(Boolean);

    // Fetch video details
    const videoDetailsResponse = await axios.get('https://youtube.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'contentDetails,statistics',
        id: videoIds.join(','),
        key: API_KEY
      }
    });

    // Fetch channel details
    const channelDetailsResponse = await axios.get('https://youtube.googleapis.com/youtube/v3/channels', {
      params: {
        part: 'snippet',
        id: channelIds.join(','),
        key: API_KEY
      }
    });

    const videoDetails = videoDetailsResponse.data.items || [];
    const channelDetails = channelDetailsResponse.data.items || [];

    return items.map((item, index) => {
      const videoDetail = videoDetails[index] || {};
      const channelDetail = channelDetails.find(
        channel => channel.id === item.snippet?.channelId
      );

      return {
        videoId: item.id?.videoId || item.id,
        title: item.snippet?.title,
        description: item.snippet?.description,
        thumbnail: item.snippet?.thumbnails?.high?.url,
        channelTitle: item.snippet?.channelTitle,
        channelId: item.snippet?.channelId,
        duration: parseVideoDuration(videoDetail?.contentDetails?.duration),
        views: convertRawtoString(videoDetail?.statistics?.viewCount),
        publishedAt: timeSince(new Date(item.snippet?.publishedAt)),
        channelInfo: {
          id: item.snippet?.channelId,
          image: channelDetail?.snippet?.thumbnails?.default?.url,
          name: item.snippet?.channelTitle
        }
      };
    });
  } catch (error) {
    console.error('Error parsing video data:', error);
    return [];
  }
};