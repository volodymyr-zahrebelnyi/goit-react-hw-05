import { useState, useEffect, useRef, Suspense } from "react";
import {
  useParams,
  NavLink,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import { getMovieById } from "../../components/services/movies-api";
import MovieCast from "../../components/MovieCast/MovieCast";

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  const defaultImg =
    "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

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
            src={
              movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                : defaultImg
            }
            alt="poster"
            width="250"
            height="350"
          ></img>
          <h2>{movieDetails.title}</h2>
          <p>Overview: {movieDetails.overview}</p>
          <p>
            Genres: {movieDetails.genres.map(genre => genre.name).join(", ")}
          </p>

          <h3>Additional Information</h3>
          <ul>
            <li>
              <NavLink to="cast">Cast</NavLink>
            </li>
            <li>
              <NavLink to="reviews">Reviews</NavLink>
            </li>
          </ul>

          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      )}
    </div>
  );
}
