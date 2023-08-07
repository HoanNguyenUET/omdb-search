import {
  InputLabel,
  MenuItem,
  TextField,
  FormControl,
  Select,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import FilmItem from "./FilmItem";
import SearchIcon from "@mui/icons-material/Search";

function App() {
  const [inputText, setInputText] = useState("");
  const [movies, setMovies] = useState([]);
  const baseurl = "http://www.omdbapi.com";
  const apiKey = "939bff44";
  const url = `${baseurl}/?apikey=${apiKey}&s=${inputText}`;
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const onInputChanged = (e) => {
    setInputText(e.target.value);
  };

  if (inputText !== "") document.title = inputText;
  else document.title = "OMDb Search";

  const [yearReleased, setYearReleased] = useState("Any");
  const [sortOption, setSortOption] = useState("None");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search === undefined) {
          setMovies([]);
        } else {
          setMovies(data.Search);
        }
      });
  }, [url]);
  if (searchButtonClicked === true) {
    fetch(`${url}&y=${yearReleased}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search === undefined) {
          setMovies([]);
        } else {
          setMovies(data.Search);
        }
      });
    setSearchButtonClicked(false);
  }
  useEffect(() => {
    let sortedFilms = [...movies];
    if (sortOption === "Year") {
      sortedFilms.sort((a, b) => b.Year - a.Year);
    } else if (sortOption === "Title") {
      sortedFilms.sort((a, b) => a.Title.localeCompare(b.Title));
    }
    setMovies(sortedFilms);
  }, [sortOption, movies]);

  const renderSearchTextfield = () => {
    return (
      <TextField
        sx={{ margin: "10px 2px" }}
        label="Title:"
        placeholder="Avengers,Batman,..."
        variant="outlined"
        defaultValue={inputText}
        onChange={onInputChanged}
      />
    );
  };

  const handleYearFilterChange = (e) => {
    setYearReleased(e.target.value);
  };

  const renderYearFilter = () => {
    return (
      <>
        <TextField
          label="Year Release"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="2023"
          value={yearReleased}
          onChange={handleYearFilterChange}
          fullWidth
          sx={{ margin: "10px 2px", maxWidth: 120 }}
        />
      </>
    );
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  const renderMoviesSorter = () => {
    return (
      <FormControl fullWidth sx={{ margin: "10px 2px", maxWidth: 120 }}>
        <InputLabel>Sort by</InputLabel>
        <Select value={sortOption} label="Sort by" onChange={handleSortChange}>
          <MenuItem value={"None"}>None</MenuItem>
          <MenuItem value={"Year"}>Year</MenuItem>
          <MenuItem value={"Title"}>Title</MenuItem>
        </Select>
      </FormControl>
    );
  };
  const onSearchButtonClicked = () => {
    setSearchButtonClicked(true);
  };
  const renderSearchButton = () => {
    return (
      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        sx={{ width: 230, margin: "10px 2px" }}
        onClick={onSearchButtonClicked}
      >
        Search
      </Button>
    );
  };

  const mapMoviestoComponent = (movie, index) => (
    <FilmItem film={movie} key={index} />
  );
  return (
    <>
      {renderSearchTextfield()}
      <Stack direction="row">
        {renderYearFilter()}
        {renderMoviesSorter()}
      </Stack>
      {renderSearchButton()}
      {movies.map(mapMoviestoComponent)}
      {movies.length === 0 && <Typography>No Result</Typography>}
    </>
  );
}

export default App;
