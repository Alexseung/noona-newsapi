let search = document.querySelector('.search');
let searchArea = document.querySelector('.search-area');
let inputArea = document.getElementById('input-area');
let searchBtn = document.querySelector('.search-button');
let menus = document.querySelectorAll('.menus button'); //지금 menus는 array임
let sideMenus = document.querySelectorAll('#side-menu li a');
//사이드 메뉴, 상단 메뉴 추가
sideMenus.forEach(menu =>
  menu.addEventListener('click', event => getNewsByCategory(event))
);
menus.forEach(menu =>
  menu.addEventListener('click', event => getNewsByCategory(event))
);

const API_KEY = `203207a5e7ec4700b1717e879ed1396a`;

let newsList = [];
const getLatestNews = async () => {
  const url = new URL(
    `https://yoon-newsapi.netlify.app//top-headlines?country=kr`
  );
  // https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apikey=${API_KEY}
  // https://yoon-newsapi.netlify.app//top-headlines?country=kr
  const data = await (await fetch(url)).json();
  newsList = data.articles;
  console.log('news', newsList);
  render();
};
getLatestNews();

const getNewsByCategory = async event => {
  const category = event.target.textContent.toLowerCase();
  console.log('category', category);
  const url = new URL(
    `https://yoon-newsapi.netlify.app//top-headlines?country=kr&category=${category}`
  );
  const data = await (await fetch(url)).json();
  console.log('ddd', data);
  newsList = data.articles;
  render();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById('search-input').value;
  console.log('keyword', keyword);
  const url = new URL(
    `https://yoon-newsapi.netlify.app//top-headlines?country=kr&q=${keyword}`
  );
  const data = await (await fetch(url)).json();
  console.log('keyword data', data);
  newsList = data.articles;
  render();
};

search.addEventListener('click', function () {
  if (searchArea.style.display === 'none' || searchArea.style.display === '') {
    searchArea.style.display = 'flex';
  } else {
    searchArea.style.display = 'none';
  }
});

const render = () => {
  let newsHTML = newsList
    .map(news => {
      return `<div class="row news">
            <div class="col-lg-4">
              <img
                class="news-img-size"
                src="${news.urlToImage || 'images / No_Image_Available.jpg'}"
                alt="News Image"
                onerror="this.onerror=null;this.src='images/No_Image_Available.jpg';"
              />
            </div>
            <div class="col-lg-8">
              <h2>${news.title}</h2>
               <p>${
                 news.description == null || news.description == ''
                   ? '내용없음'
                   : news.description.length > 200
                   ? news.description.substring(0, 200) + '...'
                   : news.description
               }</p>
              <div>${news.source.name || 'No source'} * ${moment(
        news.publishedAt
      ).fromNow()}</div>
            </div>
          </div>`;
    })
    .join('');

  document.getElementById('news-board').innerHTML = newsHTML; // articles 요소에 HTML 삽입
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
