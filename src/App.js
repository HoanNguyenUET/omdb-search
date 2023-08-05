import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
  FormControl,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilmItem from "./FilmItem";

const consecutiveYears = Array.from(
  { length: 2023 - 1900 + 1 },
  (_, index) => 1900 + index
);
consecutiveYears.unshift("None");

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
          if (data.Search === undefined) {
            setMovies([]);
          } else {
            setMovies(data.Search);
          }
        });
    }
  };

  const mapMoviestoComponent = (movie, index) => (
    <FilmItem film={movie} key={index} />
  );

  if (inputText !== "") document.title = inputText;
  else document.title = "OMDb Search";

  const [fromYear, setFromYear] = useState("None");

  useEffect(() => {
    if (fromYear !== "None") {
      fetch(`${url}&y=${fromYear}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.Search === undefined) {
            setMovies([]);
          } else {
            setMovies(data.Search);
          }
        });
    }
  }, [fromYear, url]);
  const handleYearFilterChange = (e) => {
    setFromYear(e.target.value);
  };
  const renderYearFilter = () => {
    return (
      <Box sx={{ margin: "20px 0", maxWidth: 100 }}>
        <FormControl fullWidth>
          <InputLabel>From Year</InputLabel>
          <Select
            value={fromYear}
            label="From Year"
            onChange={handleYearFilterChange}
          >
            {consecutiveYears.map((value, index) => (
              <MenuItem value={value} key={index}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };
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
      {renderYearFilter()}
      {movies.map(mapMoviestoComponent)}
      {movies.length === 0 && <Typography>Movies not found</Typography>}
    </>
  );
}

export default App;
