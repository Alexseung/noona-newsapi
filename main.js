const API_KEY = `203207a5e7ec4700b1717e879ed1396a`;
let news = [];
const getLatestNews = async () => {
  const url = new URL(
    `https://yoon-newsapi.netlify.app//top-headlines?country=kr`
  );
  //   &apikey=${API_KEY}
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log('news', news);
};
getLatestNews();
