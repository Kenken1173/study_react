import { Link } from "react-router";
import "./App.css";

type Movie = {
    id: string;
    poster_path: string;
    original_title: string;
};

type Props = {
    movie: Movie;
};

const MovieCard = (props: Props) => {
    const { movie } = props;

    return (
        <Link to={`movies/${movie.id}`} key={movie.id} className="movie-card">
            <div className="movie-card__imgwrap">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.original_title}
                    className="movie-card__img"
                />
                <div className="movie-card__overview">
                    <h3 className="movie-card__title">{movie.original_title}</h3>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;