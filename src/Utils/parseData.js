const parseData = async (items) => {
  try {
    const videoIds = [];
    const channelIds = [];

    // Extract video and channel IDs
    items.forEach((item) => {
      videoIds.push(item.id?.videoId || item.id);
      channelIds.push(item.snippet.channelId);
    });

    // Map the data into our desired format
    const parsedData = items.map((item) => {
      const { snippet } = item;
      return {
        videoId: item.id?.videoId || item.id,
        title: snippet.title,
        description: snippet.description,
        thumbnail: snippet.thumbnails.high.url,
        channelTitle: snippet.channelTitle,
        publishedAt: snippet.publishedAt,
        channelId: snippet.channelId
      };
    });

    return parsedData;
  } catch (error) {
    console.error("Error parsing video data:", error);
    return [];
  }
};

export { parseData };