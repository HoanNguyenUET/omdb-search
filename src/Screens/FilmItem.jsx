import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const FilmItem = ({ film }) => {
  const id = film.imdbID;

  return (
    <Link to={`/${film.Title}/${id}`}>
      <Box>
        <img src={film.Poster} alt={film.Title} />
        <h3>{film.Title}</h3>
        <h3>{film.Year}</h3>
        <h3>{film.Type}</h3>
      </Box>
    </Link>
  );
};
export default FilmItem;
