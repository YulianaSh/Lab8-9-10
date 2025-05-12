import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import { movies } from '../data/movies';

const Booking = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  return (
    <div className="booking-page">
      <h1 className="page-title">Оберіть місця в залі</h1>
      <p className="booking-details">
        {movie.title}, Сьогодні, {movie.sessions[0].time}, Зал 1
      </p>
      <CinemaHall />
    </div>
  );
};

export default Booking;