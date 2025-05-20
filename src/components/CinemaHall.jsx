import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingService from '../services/BookingService';

const CinemaHall = () => {
  const { id } = useParams();
  const rows = 8;
  const seatsPerRow = [17, 17, 17, 17, 17, 17, 17, 13];
  const initialSeats = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: seatsPerRow[rowIndex] }, (_, seatIndex) => ({
      row: rowIndex + 1,
      seat: seatIndex + 1,
      status: 'available',
    }))
  );

  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const bookedSeats = BookingService.getBookedSeats(id);
    const newSeats = [...initialSeats];
    bookedSeats.forEach((seat) => {
      const rowIndex = seat.row - 1;
      const seatIndex = seat.seat - 1;
      if (newSeats[rowIndex] && newSeats[rowIndex][seatIndex]) {
        newSeats[rowIndex][seatIndex].status = 'booked';
      }
    });
    setSeats(newSeats);
  }, [id]);

  const handleSeatClick = (row, seat) => {
    const newSeats = [...seats];
    const seatIndex = newSeats[row - 1].findIndex((s) => s.seat === seat);
    const currentSeat = newSeats[row - 1][seatIndex];

    if (currentSeat.status === 'booked') return;

    if (currentSeat.status === 'available') {
      newSeats[row - 1][seatIndex].status = 'selected';
      setSelectedSeats([...selectedSeats, { row, seat }]);
    } else if (currentSeat.status === 'selected') {
      newSeats[row - 1][seatIndex].status = 'available';
      setSelectedSeats(selectedSeats.filter((s) => !(s.row === row && s.seat === seat)));
    }

    setSeats(newSeats);
  };

  return (
    <div className="cinema-hall">
      <div className="screen">Екран</div>
      <div className="seats-container">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            <span className="row-number">{rowIndex + 1}</span>
            {row.map((seat) => (
              <button
                key={seat.seat}
                className={`seat ${seat.status}`}
                onClick={() => handleSeatClick(seat.row, seat.seat)}
              >
                {seat.seat}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="selected-seats">
        <h3>Вибрані місця:</h3>
        {selectedSeats.length > 0 ? (
          <ul>
            {selectedSeats.map((s, index) => (
              <li key={index}>Ряд {s.row}, Місце {s.seat}</li>
            ))}
          </ul>
        ) : (
          <p>Місця не вибрано.</p>
        )}
        {selectedSeats.length > 0 && (
          <button className="book-button">Забронювати</button>
        )}
      </div>
    </div>
  );
};

export default CinemaHall;