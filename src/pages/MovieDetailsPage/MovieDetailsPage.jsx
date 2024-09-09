import { useState, useEffect, useRef, Suspense } from "react";
import {
  useParams,
  NavLink,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import clsx from "clsx";
import { getMovieById } from "../../components/services/movies-api";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  const getNavLinkClass = props => {
    return clsx(css.link, props.isActive && css.active);
  };

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

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Failed to load movie details.</p>}
      <Link to={backLinkRef.current}>
        <button className={css.back}>← Go back</button>
      </Link>
      {movieDetails && (
        <div>
          <div className={css.movieDetails}>
            <img
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                  : defaultImg
              }
              alt="poster"
              width="200"
              height="300"
              className={css.img}
            ></img>
            <div className={css.movieDetailsDescription}>
              <h2 className={css.title}>
                {`${movieDetails.title} (${movieDetails.release_date.slice(
                  0,
                  4
                )})`}
              </h2>
              <p>User Score: {Math.round(movieDetails.vote_average * 10)}%</p>
              <p className={css.overview}>
                <span className={css.overviewText}>Overview:</span>
                <br /> {movieDetails.overview}
              </p>
              <p className={css.gnres}>
                <span className={css.overviewText}>Genres:</span>
                <br />
                {movieDetails.genres.map(genre => genre.name).join(", ")}
              </p>
            </div>
          </div>

          <h3>Additional Information</h3>
          <ul className={css.list}>
            <li>
              <NavLink to="cast" className={getNavLinkClass}>
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink to="reviews" className={getNavLinkClass}>
                Reviews
              </NavLink>
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
