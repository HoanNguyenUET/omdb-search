import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilmItems from "./filmItems";

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
  const mapMoviestoComponent = (movie, index) => <FilmItems film={movie} />;

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
