import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div>
      <h2>Not found page!</h2>
      <p>
        Please use this link to go{" "}
        <Link className={css.homeLink} to="/">
          back home
        </Link>
      </p>
    </div>
  );
}
