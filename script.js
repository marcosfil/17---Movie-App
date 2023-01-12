//API VARIABLES

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fdf443b529cfb021a28eebf7c0713e93&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w500/";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=fdf443b529cfb021a28eebf7c0713e93&query='";

//GENERAL VARIABLES

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

// Get Inicial Movies

const getMovies = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
};

// getMovies(API_URL);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (search && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});

const getClassByRate = (vote) =>
  vote >= 7 ? "green" : vote >= 5 ? "orange " : "red";

const showMovies = (movies) => {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <img
        src="${IMG_PATH + poster_path}" 
        alt="${title}"
      />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">
        ${vote_average}</span>
      </div>
      <div class="overview">
        <h3>${overview}</h3>
      </div>
    `;

    main.appendChild(movieEl);
  });
};
