const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const movieList = document.getElementById('movie-list');

// Replace this with your actual TMDb API key
const apiKey = '14eb6406622f1d4df3dbb4b4653a0c9b';

// URLs for TMDb API
const searchApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const popularApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

// Handle the search functionality
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMovies(query);  // Search movies based on input
    }
});

// Fetch popular movies when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchPopularMovies();
});

// Fetch popular movies from the API
async function fetchPopularMovies() {
    try {
        const response = await fetch(popularApiUrl);
        const data = await response.json();
        
        // Check if 'results' exists and is an array
        if (data && data.results && Array.isArray(data.results)) {
            displayMovies(data.results);
        } else {
            throw new Error('No results found or invalid data structure.');
        }
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        alert('There was an error fetching the popular movie data.');
    }
}

// Fetch movies from the API based on search query
async function fetchMovies(query) {
    try {
        const response = await fetch(searchApiUrl + query);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Check if 'results' exists and is an array
        if (data && data.results && Array.isArray(data.results)) {
            displayMovies(data.results);
        } else {
            throw new Error('No results found or invalid data structure.');
        }
    } catch (error) {
        console.error('Error fetching movie data:', error);
        alert('There was an error fetching the movie data.');
    }
}

// Display the list of movies on the page
function displayMovies(movies) {
    movieList.innerHTML = '';  // Clear the current movie list
    if (movies.length > 0) {
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');

            const movieImage = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Image';

            movieCard.innerHTML = `
                <img src="${movieImage}" alt="${movie.title}">
                <div class="info">
                    <h3>${movie.title}</h3>
                    <p>Release Date: ${movie.release_date}</p>
                    <p>Rating: ${movie.vote_average}</p>
                </div>
            `;
            movieList.appendChild(movieCard);
        });
    } else {
        movieList.innerHTML = '<p>No movies found.</p>';
    }
}
