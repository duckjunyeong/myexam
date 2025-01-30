const getScore = (currentResult) => {
  if (currentResult && currentResult.title) {
    try {
      const parsedTitle = JSON.parse(currentResult.title);
      return parsedTitle.score || 0;
    } catch (error) {
      console.error(error);
      return 0;
    }
  }
  return 0;
};

export default getScore;
