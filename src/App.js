import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

function App() {
  const [inputText, setInputText] = useState("");
  const [movies, setMovies] = useState([]);
  const baseurl = "http://www.omdbapi.com";
  const apiKey = "939bff44";
  const url = `${baseurl}/?apikey=${apiKey}&s=${inputText}`;

  const onInputChanged = (e) => {
    setInputText(e.target.value);
  };
  const onSearchButtonClicked = () => {
    if (inputText !== "") {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.Search);
        });
    }
  };
  const mapMoviestoComponent = (movie, index) => (
    <Box>
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <h3>{movie.Year}</h3>
      <h3>{movie.Type}</h3>
    </Box>
  );
  if (inputText !== "") document.title = inputText;
  else document.title = "OMDb Search";
  return (
    <>
      <Stack direction="row">
        <TextField
          focused
          label="Title:"
          placeholder="Avengers,Batman,..."
          variant="outlined"
          defaultValue={inputText}
          onChange={onInputChanged}
        />
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={onSearchButtonClicked}
        >
          Search
        </Button>
      </Stack>
      {movies.map(mapMoviestoComponent)}
    </>
  );
}

export default App;
