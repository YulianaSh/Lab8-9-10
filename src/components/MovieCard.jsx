import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/booking/${movie.id}`);
  };

  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} className="movie-card-poster" />
      <div className="movie-card-content">
        <h3 className="movie-card-title">{movie.title}</h3>
        <p className="movie-card-description">{movie.description.substring(0, 100)}...</p>
        <p className="movie-card-genre"><strong>Жанр:</strong> {movie.genre}</p>
        <div className="movie-card-sessions">
          {movie.sessions.map((session, index) => (
            <button
              key={index}
              className="session-button"
              onClick={handleBooking}
            >
              {session.time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    poster: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        time: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default MovieCard;