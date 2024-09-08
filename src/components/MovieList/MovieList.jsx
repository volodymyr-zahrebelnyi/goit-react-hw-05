import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
  //   if (!movies || movies.length === 0) {
  //     return <p>No movies found.</p>;
  //   }

  const location = useLocation();
  //   console.log(location.state);

  return (
    <ul>
      {movies.length > 0 &&
        movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>
              {movie.title}
            </Link>
          </li>
        ))}
    </ul>
  );
}
