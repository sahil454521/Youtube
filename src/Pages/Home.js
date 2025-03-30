import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useApp';
import { getHomePageVideos } from '../store/reducer/GetHomePageVideos';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import Spinner from '../Components/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../Components/Card';
import SearchCard from '../Components/SearchCard';

const Home = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector(state => state.youtubeApp.videos);
  const loading = useAppSelector(state => state.youtubeApp.loading);
  const [hasMore, setHasMore] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  const fetchMoreVideos = () => {
    if (!loading) {
      if (videos.length >= 100) {
        setHasMore(false);
        return;
      }
      dispatch(getHomePageVideos(true));
    }
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="max-h-screen overflow-hidden bg-[#212121]">
      <Navbar onSearch={handleSearchResults} />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 h-screen overflow-y-auto bg-[#212121]" id="scrollableDiv">
          {searchResults.length > 0 ? (
            <div className="flex justify-center bg-[#212121]">
              <div className="w-full px-8 py-4 space-y-4">
                {searchResults.map((video) => (
                  <SearchCard key={video.videoId} video={video} />
                ))}
              </div>
            </div>
          ) : (
            <InfiniteScroll
              dataLength={videos.length}
              next={fetchMoreVideos}
              hasMore={hasMore}
              loader={loading && <Spinner />}
              scrollableTarget="scrollableDiv"
              endMessage={
                <p className="text-center text-gray-400 py-4">
                  No more videos to load.
                </p>
              }
            >
              <div className="grid gap-4 p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {videos.map((video) => (
                  <Card key={video.videoId} video={video} />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;