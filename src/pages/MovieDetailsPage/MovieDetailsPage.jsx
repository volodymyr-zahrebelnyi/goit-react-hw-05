// import MovieCast from "../../components/MovieCast";
// import MovieReviews from "../../components/MovieReviews";

import { useState, useEffect, useRef } from "react";
import {
  useParams,
  NavLink,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import { getMovieById } from "../../components/services/movies-api";

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function fetchMovieById() {
      try {
        setLoading(true);
        const movieById = await getMovieById(movieId);
        if (!movieId) {
          return;
        }
        setMovieDetails(movieById);
      } catch (error) {
        setError(true);
        console.error("Error to get movie", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieById();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to load movie details.</p>;

  return (
    <div>
      <Link to={backLinkRef.current}>Go back</Link>
      {movieDetails && (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt={movieDetails.title}
            width="300"
            height="420"
          ></img>
          <h2>{movieDetails.title}</h2>
          <p>Overview: {movieDetails.overview}</p>
          <p>
            Genres: {movieDetails.genres.map(genre => genre.name).join(", ")}
          </p>

          <ul>
            <li>
              <NavLink to="cast">Cast</NavLink>
            </li>
            <li>
              <NavLink to="reviews">Reviews</NavLink>
            </li>
          </ul>
          <Outlet />
        </div>
      )}
    </div>
  );
}

// to={`/movies/${movieId}`}

// const handleGoBack = () => {
//   searchParams(`movies/${movieId}`, "/");
//   setSearchParams(searchParams);
// };

{
  /* <button onClick={handleGoBack} type="button">
  Go back
</button>; */
}
