import { useState, useEffect } from "react";
import { getMovieCast } from "../services/movies-api";

export default function MovieCast() {
  //   const [MovieCast, setMovieCast] = useState(null);

  return (
    <div>
      <ul>
        <li key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
            alt={movieDetails.title}
            width="300"
            height="420"
          ></img>
          <p></p>
        </li>
      </ul>
    </div>
  );
}
