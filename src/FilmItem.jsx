import { Box } from "@mui/material";

const FilmItem = ({ film }) => {
  return (
    <Box>
      <img src={film.Poster} alt={film.Title} />
      <h3>{film.Title}</h3>
      <h3>{film.Year}</h3>
      <h3>{film.Type}</h3>
    </Box>
  );
};
export default FilmItem;
