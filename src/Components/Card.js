import React from 'react';

const Card = ({ video }) => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative">
        {/* Video Thumbnail */}
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        {/* Video Duration */}
        <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 text-xs text-white rounded">
          {video.duration || '0:00'}
        </span>
      </div>
      <div className="flex mt-3 gap-3">
        {/* Channel Avatar */}
        <img
          src={video.channelInfo?.image || 'https://via.placeholder.com/36'}
          alt={video.channelTitle}
          className="h-9 w-9 rounded-full"
        />
        <div>
          {/* Video Title */}
          <h3 className="font-medium text-sm text-white line-clamp-2">
            {video.title}
          </h3>
          {/* Channel Name */}
          <p className="text-[13px] text-gray-400 hover:text-white cursor-pointer">
            {video.channelTitle}
          </p>
          {/* Views and Published Date */}
          <div className="text-[13px] text-gray-400">
            <span>{video.views} views</span>
            <span className="mx-1">•</span>
            <span>{video.publishedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;




