import React, { useState } from 'react';
import axios from 'axios';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaYoutube, FaSearch, FaMicrophone } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await axios.get('https://youtube.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 20,
          q: searchQuery,
          key: API_KEY,
          type: 'video',
        },
      });

      const results = response.data.items.map((item) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
      }));

      onSearch(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-[#212121] sticky top-0 z-50 text-white">
      {/* Left Section: Hamburger Menu and Logo */}
      <div className="flex items-center gap-4">
        <GiHamburgerMenu className="text-xl cursor-pointer" />
        <div className="flex items-center gap-2">
          <FaYoutube className="text-3xl text-red-500" />
          <span className="text-xl font-bold">YouTube</span>
        </div>
      </div>

      {/* Center Section: Search Bar */}
      <div className="flex-1 flex justify-center items-center max-w-[800px]">
        <form
          className="w-full flex items-center"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-[600px] bg-[#121212] px-4 py-2 rounded-l-full focus:outline-none border border-[#333] text-white"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#333] rounded-r-full border border-l-0 border-[#333] hover:bg-[#444]"
          >
            <FaSearch className="text-gray-400" />
          </button>
        </form>
        <button className="ml-3 px-3 py-2 bg-[#333] rounded-full hover:bg-[#444]">
          <FaMicrophone className="text-gray-300 text-lg" />
        </button>
      </div>

      {/* Right Section: Create and Notifications */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-[#333] rounded-full hover:bg-[#444]">
          <span className="font-bold">Create</span>
        </button>
        <IoMdNotificationsOutline className="text-2xl cursor-pointer" />
        <img
          src="https://via.placeholder.com/36"
          alt="User Avatar"
          className="h-9 w-9 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
