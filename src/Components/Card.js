import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Card = ({ video }) => {
  const [channelImage, setChannelImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

  useEffect(() => {
    const fetchChannelImage = async () => {
      if (!video?.channelInfo?.id) return;
      
      setIsLoading(true);
      try {
        const response = await axios.get('https://youtube.googleapis.com/youtube/v3/channels', {
          params: {
            part: 'snippet',
            id: video.channelInfo.id,
            key: API_KEY
          }
        });

        if (response.data.items && response.data.items.length > 0) {
          const imageUrl = response.data.items[0].snippet.thumbnails.default.url;
          setChannelImage(imageUrl);
        }
      } catch (error) {
        console.error('Error fetching channel image:', error);
        setChannelImage('https://via.placeholder.com/36');
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannelImage();
  }, [video?.channelInfo?.id, API_KEY]);

  return (
    <div className="bg-[#272727] hover:bg-[#323232] rounded-lg transition-all duration-200">
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 text-xs text-white rounded">
          {video.duration}
        </span>
      </div>
      <div className="p-3 flex gap-3">
        <div className="min-w-fit">
          {isLoading ? (
            <div className="h-9 w-9 rounded-full bg-gray-600 animate-pulse" />
          ) : (
            <img 
              src={channelImage}
              alt={video.channelTitle}
              className="h-9 w-9 rounded-full"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/36';
              }}
            />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-medium line-clamp-2 text-sm text-white mb-1">
            {video.title}
          </h3>
          <p className="text-[13px] text-gray-400 hover:text-white cursor-pointer">
            {video.channelTitle}
          </p>
          <div className="text-[13px] text-gray-400">
            <span>{video.views}</span>
            <span className="mx-1">•</span>
            <span>{video.publishedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;




