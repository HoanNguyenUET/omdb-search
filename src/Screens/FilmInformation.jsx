import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Styles/FilmInformation.css";

const FilmInformation = () => {
  const { movieID } = useParams();
  const [movieInfo, setMovieInfo] = useState();
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const baseurl = "http://www.omdbapi.com";
  const apiKey = "939bff44";
  const url = `${baseurl}/?apikey=${apiKey}&i=${movieID}`;
  const renderFilmInformation = () => {
    return (
      <>
        <h3 id="Title">{movieInfo.Title}</h3>
        <img src={movieInfo.Poster} alt={movieInfo.Title} />
        <h3 id="Released">{movieInfo.Released}</h3>
        <h3 id="Runtime">{movieInfo.Runtime}</h3>
        <h3 id="Genre">Genre : {movieInfo.Genre}</h3>
        <h3 id="Director">Director : {movieInfo.Director}</h3>
        <h3 id="Writer">{movieInfo.Writer}</h3>
        <h3 id="Actors">{movieInfo.Actors}</h3>
        <h3 id="Plot">{movieInfo.Plot}</h3>
        <h3 id="Country">{movieInfo.Country}</h3>
        <h3 id="imdbRating">Imdb Rating: {movieInfo.imdbRating}</h3>
        <h3 id="imdbVotes">Imdb Votes: {movieInfo.imdbVotes}</h3>
        <h3 id="Type">{movieInfo.Type}</h3>
      </>
    );
  };
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovieInfo(data);
        setLoaded(true);
        setLoading(false);
      });
  }, [url]);
  return (
    <>
      {loading && <CircularProgress />}
      {loaded && renderFilmInformation()}
    </>
  );
};
export default FilmInformation;
