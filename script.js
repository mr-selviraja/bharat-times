const btnNavToggle = document.querySelector('.btn-nav-toggle');
const categorySectionEl = document.querySelector('.category-section');
let currentCategoryName = 'general';
const currentCategoryArticles = [];

// Toggle adding classes to animate nav toggling
btnNavToggle.addEventListener('click', () => {
  btnNavToggle.classList.toggle('toggle-bars');
  headerNavEl.classList.toggle('toggle-nav');
});

// Function to return featured-article html
const getFeaturedArticleHtml = (article) => {
  const articleHtml = `
    <article class="featured-article">
      <h2> ${article.title} </h2>

      <img
        src=${article.image}
        alt="article depiction"
      />

      <hr class="hr-rule" />

      <div class="featured-article__details text-small text-italic">
        <p>Published on: ${article.publishedAt}</p>

        <a
          target="_blank"
          class="color-primary"
          href=${article.url}
          >Source: ${article.source.name}</a
        >
      </div>

      <p>
        <span>${article.description}</span>

        <a class="color-primary text-semibold link-readmore" href="#" id='0'>Read more...</a>
      </p>
    </article>
  `;

  return articleHtml;
};

// Function to return a category article html
const getCategoryArticleHtml = (article, articleId) => {
  const categoryArticleHtml = `
    <article class="category-list__article category-article">
      <div class="category-article__content">
        <h4 class="category-article__content--title">${article.title}</h4>

        <p class="category-article__content--desc">
          <span>${article.description}</span>

          <a href="#" class="color-primary text-semibold" id=${articleId}>Read more...</a>
        </p>

        <p class="category-article__content--details text-small-semibold">
          Published on: ${article.publishedAt}

          <a
            class="color-primary"
            href=${article.url}
            >Source: ${article.source.name}</a
          >
        </p>
      </div>

      <img
        class="category-article__img"
        src=${article.image}
        alt="category article depiction"
      />
    </article>
  `;

  return categoryArticleHtml;
};

// Function to return category-list html
const insertCategoryListArticlesHtml = (articles) => {
  articles.forEach((article, index) => {
    categorySectionEl.innerHTML += getCategoryArticleHtml(article, index + 1);
  });
};

// Function to add category articles html to the page
const addCategoryArticlesContent = (categoryArticles) => {
  // Call getFeaturedArticleHtml function passing the first article
  const featuredArticleHtml = getFeaturedArticleHtml(categoryArticles[0]);

  // Add the returned Html from the above function to the category-section element
  categorySectionEl.innerHTML = featuredArticleHtml;

  // Add title for the current category
  const categoryTitleEl = document.createElement('h2');
  categoryTitleEl.classList.add(['color-primary', 'category-title']);
  categoryTitleEl.textContent = currentCategoryName;

  // Call insertCategoryListArticlesHtml function passing all the articles except the first one
  const categoryListArticlesHtml = insertCategoryListArticlesHtml(
    categoryArticles.slice(1)
  );

  console.log(featuredArticleHtml);

  console.log(categoryListArticlesHtml);
};

// Function to fetch a specific category's articles
const fetchCategoryArticles = async (category) => {
  const apikey = '75b2fcfef44509b514645396d03ef06e';
  const categoryEndpointURL = `
    https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&max=10&apikey=${apikey}
  `;

  // Fetch articles
  const response = await fetch(categoryEndpointURL);

  // If response is not okay, throw an error
  if (!response.ok) throw new Error(`HTTP Error! Status ${response.status}`);

  // Parse the response into JSON
  const data = await response.json();

  // Assign the data into currentCategoryArticles
  const currentCategoryArticles = data.articles;

  console.log(currentCategoryArticles);
  addCategoryArticlesContent(currentCategoryArticles);
};

fetchCategoryArticles(currentCategoryName);
