import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useApp';
import { getHomePageVideos } from '../store/reducer/GetHomePageVideos';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import Spinner from '../Components/Spinner';

const Home = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector(state => state.youtubeApp.videos);
  const loading = useAppSelector(state => state.youtubeApp.loading);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  return (
    <div className="max-h-screen overflow-hidden bg-[#212121]">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 h-screen overflow-y-auto bg-[#212121]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Spinner />
            </div>
          ) : (
            <div className="grid gap-4 p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {videos?.length > 0 ? (
                videos.map((video) => (
                  <div 
                    key={video.videoId} 
                    className="bg-[#272727] hover:bg-[#323232] rounded-lg shadow-sm transition-all duration-200"
                  >
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-3">
                      <h3 className="font-semibold line-clamp-2 text-white">{video.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{video.channelTitle}</p>
                      <div className="text-xs text-gray-400 mt-1">
                        {video.views} views • {video.publishedAt}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-gray-400">
                  No videos available
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;