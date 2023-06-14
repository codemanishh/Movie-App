import React, { useState, useEffect } from 'react';
import '../components/main.css'
function MovieSearch() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadMovies(searchTerm);
  }, [searchTerm]);

  async function loadMovies(searchTerm) {
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
    const res = await fetch(URL);
    const data = await res.json();
    if (data.Response === 'True') {
      setMovies(data.Search);
    }
  }

  async function loadMovieDetails(imdbID) {
    const detailsURL = `https://www.omdbapi.com/?i=${imdbID}&apikey=fdf33b01`;
    const res = await fetch(detailsURL);
    const data = await res.json();
    setSelectedMovie(data);
  }

  function displayMovieDetails(movie) {
    loadMovieDetails(movie.imdbID);
  }

  return (
    <div>
      <div className="input">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="scroll-box ">
        {movies.length > 0 && (
          <div className='search-box'>
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="search-list-item"
                onClick={() => displayMovieDetails(movie)}
              >
                <div className="search-item-thumbnail">
                  <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'image_not_found.png'}
                    alt="Movie Poster"
                  />
                </div>
                <div className="search-item-info">
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedMovie && (
        <div className='div2boxes'>
          <div className="movie-poster">
            <img
              src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : 'image_not_found.png'}
              alt="Movie Poster"
            />
          </div>
          <div className="movie-info">
            <h3 className="movie-title">{selectedMovie.Title}</h3>
            <ul className="movie-misc-info">
              <li className="year">Year: {selectedMovie.Year}</li>
              <li className="rated">Ratings: {selectedMovie.Rated}</li>
              <li className="released">Released: {selectedMovie.Released}</li>
            </ul>
            <p className="genre">
              <b>Genre:</b> {selectedMovie.Genre}
            </p>
            <p className="writer">
              <b>Writer:</b> {selectedMovie.Writer}
            </p>
            <p className="actors">
              <b>Actors:</b> {selectedMovie.Actors}
            </p>
            <p className="plot">
              <b>Plot:</b> {selectedMovie.Plot}
            </p>
            <p className="language">
              <b>Language:</b> {selectedMovie.Language}
            </p>
            <p className="awards">
              <b>
                <i className="fas fa-award"></i>
              </b>{' '}
              {selectedMovie.Awards}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieSearch;
