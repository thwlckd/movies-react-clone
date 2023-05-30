import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import { useNavigate } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  // console.log(movie);

  // 뒤로가기 버튼
  const navigate = useNavigate(); 
  const onClickBtn = () => {
    navigate(-1);
  };
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <header>
            <button className={styles.button__before} onClick={onClickBtn}>←</button>
          </header>
          <div className={styles.movie}>
            <img
              src={movie.medium_cover_image}
              alt={movie.title}
              className={styles.movie__img}
            />
            <div className={styles.movie__text}>
              <Link to={`${movie.url}`}>
                <h2 className={styles.movie__title}>{movie.title}</h2>
              </Link>
              <h3 className={styles.movie__year}>{movie.year}</h3>
              <ul className={styles.movie__genres}>
                {movie.genres.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
              <p>
                {movie.description_full.length > 235
                  ? `${movie.description_full.slice(0, 235)}...`
                  : movie.description_full}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
