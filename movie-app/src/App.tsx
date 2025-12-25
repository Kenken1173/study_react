
import { Link } from 'react-router';
import './App.css'
import { useEffect, useState } from "react";

// 今回使用予定のプロパティ
type Movie = {
  id: string;
  original_title: string;
  poster_path: string;
  overview: string;
}

// apiを取得して返ってくる
type MovieJson = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_data: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

function App() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  // Reactの機能で、入力によって値が変わる変数などを扱う時にuseStateをつかう(画面更新)
  // keywordがsetKeywordによって変わる
  const [keyword, setKeyword] = useState("");
  const [movieList, setMovieList] = useState<Movie[]>([]);

  // 非同期処理
  const fetchMovieList = async () => {
    let url = ""
    if (keyword) {
      // moviedbのsearch movie apiのエンドポイントを使用
      url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=jaS&page=1`;
    } else {
      url = "https://api.themoviedb.org/3/movie/popular?language=Ja&page=1";
    }

    const response = await fetch(
      url,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const data = await response.json();
    setMovieList(data.results.map((movie: MovieJson) => ({
      id: movie.id,
      original_title: movie.original_title,
      overview: movie.overview,
      poster_path: movie.poster_path,
    }))
    );
  };

  // フックスの一つ
  useEffect(() => {
    fetchMovieList()
  }, [keyword])

  // カーリーブレスと呼ばれる{}を使ってjavascriptを使える
  return (
    // HTMLを書く
    <div>
      <div>{keyword}</div>
      {/* eはイベントを表す */}
      <input type="text" onChange={(e) => setKeyword(e.target.value)} />
      {movieList.filter((movie) => movie.original_title.includes(keyword)).map((movie) => (
        <Link to={`/movies/${movie.id}`} key={movie.id}>
          <h2>{movie.original_title}</h2>
          <img src={`https://media.themoviedb.org/t/p/w600_and_h900_face/${movie.poster_path}`} />
          <p>{movie.overview}</p>
        </Link>
      ))}
    </div>
  );
}

export default App;
