import React, { useState, useEffect } from 'react';
import '../components/main.css';

function MovieSearch() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setSearchTerm('GOD'); // Set the initial search term to "GOD" when the component mounts
  }, []);

  useEffect(() => {
    loadMovies(searchTerm);
  }, [searchTerm]);

  async function loadMovies(searchTerm) {
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
    const res = await fetch(URL);
    const data = await res.json();
    if (data.Response === 'True') {
      setMovies(data.Search);
      if (data.Search.length > 0) {
        setSelectedMovie(data.Search[0]); 
      }
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
    <div className="first-class">
      <div className="input">
        {/* ...................    */}
        <div className="group">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            placeholder="Search"
            type="search"
            className="input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* .......................  */}
      </div>
      <div className="newscroll">
        <div className="scroll-box">
          {movies.length > 0 && (
            <div className="search-box">
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
      </div>
      {selectedMovie && (
        <div className="div2boxes">
          <div className="movie-poster">
            <img
              src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : 'image_not_found.png'}
              alt="Movie Poster"
            />
          </div>
          <div className="movie-info">
            <h3 className="movie-title">
              <b>{selectedMovie.Title}</b>
            </h3>
            <ul className="movie-misc-info">
              <li className="year">
                <b>Year:</b> {selectedMovie.Year}
              </li>
              <li className="rated">
                <b>Ratings: </b>
                {selectedMovie.Rated}
              </li>
              <li className="released">
                <b>Released:</b> {selectedMovie.Released}
              </li>
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
