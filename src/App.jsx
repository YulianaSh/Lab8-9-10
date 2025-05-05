import MovieList from './components/MovieList';
import { movies } from './data/movies';
import './styles/styles.css';

function App() {
  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;