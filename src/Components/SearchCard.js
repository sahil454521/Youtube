import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdWatchLater, MdPlaylistAdd } from 'react-icons/md';
import { RiShareForwardLine } from 'react-icons/ri';

const SearchCard = ({ video }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="group flex gap-4 hover:bg-[#323232] p-3 transition-all duration-200 max-w-[1096px] cursor-pointer relative">
      {/* Thumbnail Section */}
      <div className="relative min-w-fit">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-[360px] h-[202px] object-cover rounded-lg"
        />
        <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 text-xs text-white rounded">
          {video.duration}
        </span>
        {/* Hover Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-600 opacity-0 group-hover:opacity-100">
          <div className="w-0 h-full bg-red-600 group-hover:w-full transition-all duration-[25000ms]"></div>
        </div>
      </div>

      {/* Video Details Section */}
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-medium text-white line-clamp-2 flex-1">
            {video.title}
          </h3>
          {/* Three Dots Menu */}
          <div className="relative">
            <button 
              className="p-2 hover:bg-[#444] rounded-full opacity-0 group-hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                setShowOptions(!showOptions);
              }}
            >
              <BsThreeDotsVertical className="text-white text-xl" />
            </button>
            
            {/* Options Menu */}
            {showOptions && (
              <div 
                className="absolute right-0 mt-2 bg-[#282828] border border-[#444] rounded-lg shadow-lg z-50 min-w-[200px]"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="flex items-center gap-3 w-full px-4 py-2 text-white hover:bg-[#444] text-sm">
                  <MdWatchLater className="text-xl" />
                  Save to Watch later
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-2 text-white hover:bg-[#444] text-sm">
                  <MdPlaylistAdd className="text-xl" />
                  Save to playlist
                </button>
                <button className="flex items-center gap-3 w-full px-4 py-2 text-white hover:bg-[#444] text-sm">
                  <RiShareForwardLine className="text-xl" />
                  Share
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="text-sm text-gray-400 mt-1">
          <span>{video.views} views</span>
          <span className="mx-1">•</span>
          <span>{video.publishedAt}</span>
        </div>

        {/* Channel Info */}
        <div className="flex items-center gap-2 mt-4">
          <img
            src={video.channelInfo?.image || 'https://via.placeholder.com/36'}
            alt={video.channelTitle}
            className="h-6 w-6 rounded-full"
          />
          <span className="text-sm text-gray-400 hover:text-white">
            {video.channelTitle}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 mt-4 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
};

export default SearchCard;