const API_KEY = `203207a5e7ec4700b1717e879ed1396a`;
const getLatestNews = () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&apikey=${API_KEY}`
  );
  fetch(url);
};
getLatestNews();
