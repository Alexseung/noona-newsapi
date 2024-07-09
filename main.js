let search = document.querySelector('.search');
let searchArea = document.querySelector('.search-area');
let articles = document.getElementById('articles');

const API_KEY = `203207a5e7ec4700b1717e879ed1396a`;
let news = [];
const getLatestNews = async () => {
  const url = new URL(
    `https://yoon-newsapi.netlify.app//top-headlines?country=kr`
  );
  //   https://newsapi.org/v2/top-headlines?country=kr&apikey=${API_KEY}
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log('news', news);
  render();
};
getLatestNews();

search.addEventListener('click', function () {
  if (searchArea.style.display === 'none' || searchArea.style.display === '') {
    searchArea.style.display = 'flex';
  } else {
    searchArea.style.display = 'none';
  }
});

const render = () => {
  let newsHTML = news
    .map(article => {
      return `<div class="row news">
            <div class="col-lg-4">
              <img
                class="news-img-size"
                src="${article.urlToImage}"
                alt="News Image"
              />
            </div>
            <div class="col-lg-8">
              <h2>${article.title}</h2>
              <p>${article.description}</p>
              <div>${article.content}</div>
            </div>
          </div>`;
    })
    .join(''); // 배열을 문자열로 변환(이 부분 더 학습)

  articles.innerHTML = newsHTML; // articles 요소에 HTML 삽입
};

// const render = () => {
//   let newsHTML = news
//     .map(article => {
//       return `<div class="row news">
//           <div class="col-lg-4">
//             <img
//               class="news-img-size"
//               src="${atcicle.urlToImage}"
//             />
//           </div>
//           <div class="col-lg-8">
//             <h2>귀칼</h2>
//             <p>어제부터 봄</p>
//             <div>오늘 에피소드4까지 봤음</div>
//           </div>
//         </div>`;
//     })
//     .join();
//   Document.getElementById('articles').innerHTML = newsHTML;
// };
