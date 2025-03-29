import axios from 'axios';
import { parseVideoDuration } from './parseVideoDuration';
import { convertRawtoString } from './convertRawtoString';
import { timeSince } from './timeSince';

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const parseRecommendedData = async (items) => {
    try {
        if (!items || !Array.isArray(items)) {
            console.warn('Invalid items received:', items);
            return [];
        }

        // Extract IDs
        const videoIds = items.map(item => item.id.videoId).filter(Boolean);
        const channelIds = items.map(item => item.snippet.channelId).filter(Boolean);

        // Fetch channel data
        const { data: { items: channelsData } } = await axios.get(
            `https://youtube.googleapis.com/youtube/v3/channels`, {
                params: {
                    part: 'snippet,contentDetails',
                    id: channelIds.join(','),
                    key: API_KEY
                }
            }
        );

        // Parse channel data
        const parsedChannelsData = channelsData.map(channel => ({
            id: channel.id,
            image: channel.snippet.thumbnails.default.url
        }));

        // Fetch video details
        const { data: { items: videosData } } = await axios.get(
            `https://youtube.googleapis.com/youtube/v3/videos`, {
                params: {
                    part: 'contentDetails,statistics',
                    id: videoIds.join(','),
                    key: API_KEY
                }
            }
        );

        // Parse and combine data
        const parseData = items.map((item, index) => {
            const channelData = parsedChannelsData.find(
                data => data.id === item.snippet.channelId
            );

            if (!channelData) return null;

            return {
                videoId: item.id.videoId,
                videoTitle: item.snippet.title,
                videoDescription: item.snippet.description,
                videoThumbnail: item.snippet.thumbnails.medium.url,
                videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                videoDuration: parseVideoDuration(
                    videosData[index]?.contentDetails?.duration
                ),
                videoViews: convertRawtoString(
                    videosData[index]?.statistics?.viewCount
                ),
                videoAge: timeSince(new Date(item.snippet.publishedAt)),
                channelInfo: {
                    id: item.snippet.channelId,
                    image: channelData.image,
                    name: item.snippet.channelTitle
                }
            };
        }).filter(Boolean);

        return parseData;
    } catch (error) {
        console.error('Error parsing recommended data:', error);
        return [];
    }
};