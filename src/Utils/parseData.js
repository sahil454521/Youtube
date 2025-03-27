const parseData = async (items) => {
  try {
    if (!items || !Array.isArray(items)) {
      console.warn('Invalid items data received:', items);
      return [];
    }

    const parsedData = items.map((item) => {
      // Early return if item or snippet is missing
      if (!item?.snippet) {
        console.warn('Missing snippet data for item:', item);
        return null;
      }

      const { snippet } = item;
      return {
        videoId: item.id?.videoId || item.id || '',
        title: snippet.title || '',
        description: snippet.description || '',
        thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || '',
        channelTitle: snippet.channelTitle || '',
        publishedAt: snippet.publishedAt || '',
        channelId: snippet.channelId || ''
      };
    })
    .filter(Boolean); // Remove any null entries

    return parsedData;
  } catch (error) {
    console.error("Error parsing video data:", error);
    return [];
  }
};

export { parseData };