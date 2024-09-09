// import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { getTrendingMovies } from "../../components/services/movies-api";
import css from "./HomePage.module.css";

const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

export default function HomePage() {
  const [trandingMovies, setTrandingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // const location = useLocation();

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        setLoading(true);
        const movies = await getTrendingMovies();
        setTrandingMovies(movies);
      } catch (error) {
        setError(true);
        console.error("Error to get tranding movies", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1 className={css.header}>Trending today</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Failed to load tranding movies.</p>}
      {/* <ul className={css.list}>
        {trandingMovies.length > 0 &&
          trandingMovies.map(movie => (
            <li key={movie.id} className={css.item}>
              <Link to={`/movies/${movie.id}`} state={location}>
                {movie.title}
              </Link>
            </li>
          ))}
      </ul> */}
      <Suspense>
        <MovieList movies={trandingMovies} />
      </Suspense>
    </div>
  );
}
