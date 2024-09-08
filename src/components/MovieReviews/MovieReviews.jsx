import { useParams } from "react-router-dom";
import { getMovieReviews } from "../services/movies-api";
import { useEffect, useState } from "react";

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
      <ul>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <li key={review.id}>
              <p>Author: {review.author}</p>
              <p>Review: {review.content}</p>
            </li>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </ul>
    </div>
  );
}
