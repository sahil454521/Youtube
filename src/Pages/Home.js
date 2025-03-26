import React, { useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import { useAppDispatch, useAppSelector } from '../hooks/useApp';
import { getHomePageVideos } from '../store/reducer/GetHomePageVideos';

const Home = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector(state => state.youtubeApp.videos);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  return (
    <div className='max-h-screen overflow-hidden'>
      <div className='flex'>
        <Sidebar />
        <div>
          {/* Add video content here */}
          {videos.map((video) => (
            <div key={video.id}>{video.snippet.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
