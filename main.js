let search = document.querySelector('.search');
let searchArea = document.querySelector('.search-area');
let inputArea = document.getElementById('input-area');
let searchBtn = document.querySelector('.search-button');
let menus = document.querySelectorAll('.menus button'); //지금 menus는 array임
let sideMenus = document.querySelectorAll('#side-menu li a');
let searchInput = document.getElementById('search-input');
//사이드 메뉴, 상단 메뉴 추가
sideMenus.forEach(menu =>
  menu.addEventListener('click', event => getNewsByCategory(event))
);
menus.forEach(menu =>
  menu.addEventListener('click', event => getNewsByCategory(event))
);

searchInput.addEventListener('focus', () => {
  searchInput.value = '';
});
searchInput.addEventListener('keydown', handleKeyDown);
function handleKeyDown(event) {
  if (event.key === 'Enter') {
    getNewsByKeyword();
    searchInput.value = '';
  }
}
// url과 fetch부분 전부 다 전역변수로 바꿔버림.
// 반복적으로 사용되는 부분은 전역변수로 묶기

// https://study-website-be-bbb1539aa813.herokuapp.com/
const getNews = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error('No result for this search');
      }
      newsList = data.articles;
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const API_KEY = `203207a5e7ec4700b1717e879ed1396a`;
let url = new URL(
  // `https://newsapi.org/v2/top-headlines?country=kr&pageSize=10&apikey=${API_KEY}`
  `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=10`
);
let newsList = [];
const getLatestNews = async () => {
  url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=kr&pageSize=10&apikey=${API_KEY}`
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=10`
  );
  await getNews();
};
getLatestNews();

const getNewsByCategory = async event => {
  const category = event.target.textContent.toLowerCase();
  console.log('category', category);
  url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apikey=${API_KEY}`
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=10&category=${category}`
  );
  await getNews();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById('search-input').value;
  console.log('keyword', keyword);
  url = new URL(
    // `https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apikey=${API_KEY}`
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=10&q=${keyword}`
  );
  await getNews();
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

const errorRender = errorMessage => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;

  document.getElementById('news-board').innerHTML = errorHTML;
};
