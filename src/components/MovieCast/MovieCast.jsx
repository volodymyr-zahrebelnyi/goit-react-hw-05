import { useParams } from "react-router-dom";
import { getMovieCast } from "../services/movies-api";
import { useState, useEffect } from "react";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCast() {
      try {
        setLoading(true);
        const dataCast = await getMovieCast(movieId);
        setCast(dataCast);
      } catch (error) {
        setError(true);
        console.error("Error to get movie's cast", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to load movie's cast.</p>;

  return (
    <div>
      <ul>
        {cast.length > 0 ? (
          cast.map(actor => (
            <li key={actor.cast_id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt="actor"
                width="100"
                height="150"
              />
              <p>{actor.name}</p>
              <p>{actor.character}</p>
            </li>
          ))
        ) : (
          <p>No cast information available</p>
        )}
      </ul>
    </div>
  );
}
