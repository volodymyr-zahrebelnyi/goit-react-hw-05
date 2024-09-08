import { useParams } from "react-router-dom";
import { getMovieReviews } from "../services/movies-api";
import { useEffect, useState } from "react";
import css from "./MovieReview.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const dataReviews = await getMovieReviews(movieId);
        setReviews(dataReviews);
      } catch (error) {
        setError(true);
        console.error("Error to get movie's reviews", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Failed to load movie's reviews.</p>;

  return (
    <div>
      <ul className={css.list}>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <li key={review.id} className={css.item}>
              <p className={css.author}>
                <span className={css.span}>Author: </span> {review.author}
              </p>
              <p>
                <span className={css.span}>Review: </span> {review.content}
              </p>
            </li>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </ul>
    </div>
  );
}
