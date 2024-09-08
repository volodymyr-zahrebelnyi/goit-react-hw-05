import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../components/services/movies-api";

export default function HomePage() {
  const [trandingMovies, setTrandingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to load tranding movies.</p>;

  return (
    <div>
      <h1>Trending today</h1>
      <ul>
        {trandingMovies.length > 0 &&
          trandingMovies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
