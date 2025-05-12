import MovieList from '../components/MovieList';
import { movies } from '../data/movies';

const Home = () => {
  return (
    <div>
      <h1 className="page-title">Movies for you!</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;