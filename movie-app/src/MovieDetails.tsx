import { useParams } from "react-router";

function MovieDetail() {
    // main.tsxのmovieIdに対応している
    const { movieId } = useParams();
    return (
        <div>
            <h1>Movie Detail</h1>
            <div>{movieId}</div>
        </div >
    )
}

export default MovieDetail;