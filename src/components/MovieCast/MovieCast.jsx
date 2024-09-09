import { useParams } from "react-router-dom";
import { getMovieCast } from "../services/movies-api";
import { useState, useEffect } from "react";
import css from "./MovieCast.module.css";

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
        setCast(dataCast.slice(0, 10));
      } catch (error) {
        setError(true);
        console.error("Error to get movie's cast", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [movieId]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Failed to load movie's cast.</p>}
      <ul className={css.list}>
        {cast.length > 0 ? (
          cast.map(actor => (
            <li key={actor.cast_id} className={css.item}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                alt="actor"
                width="100"
                height="150"
                className={css.img}
              />
              <p className={css.name}>{actor.name}</p>
              <p className={css.character}>{actor.character}</p>
            </li>
          ))
        ) : (
          <p>No cast information available.</p>
        )}
      </ul>
    </div>
  );
}
