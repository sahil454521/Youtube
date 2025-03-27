import React, { useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import { useAppDispatch, useAppSelector } from '../hooks/useApp';
import { getHomePageVideos } from '../store/reducer/GetHomePageVideos';
import Navbar from '../Components/Navbar';
const Home = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector(state => state.youtubeApp.videos);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  return (
    <div className='max-h-screen overflow-hidden'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <div>
          {videos && videos.length > 0 ? (
            videos.map((video) => (
              <div key={video.videoId}>
                {/* Video content */}
              </div>
            ))
          ) : (
            <div>No videos available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
