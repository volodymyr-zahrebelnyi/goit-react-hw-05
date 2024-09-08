import { useSearchParams } from "react-router-dom";
import { getMovies } from "../../components/services/movies-api";
import { useState, useEffect, lazy, Suspense } from "react";
// import MovieList from "../../components/MovieList/MovieList";

const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) return;
    async function fetchMovies() {
      try {
        setLoading(true);
        const movies = await getMovies(query);
        setMovies(movies);
      } catch (error) {
        setError(true);
        console.error("Error to get movies", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  const handleSubmit = evt => {
    evt.preventDefault();
    const searchQuery = evt.target.elements.query.value.trim();
    if (searchQuery === "") return;
    setSearchParams({ query: searchQuery });
    evt.target.reset();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to load movie.</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" />
        <button type="submit">Search</button>
      </form>

      <Suspense>
        <MovieList movies={movies} />
      </Suspense>
    </div>
  );
}
