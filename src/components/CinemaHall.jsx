import { useState } from 'react';

const CinemaHall = () => {
  const rows = 6;
  const seatsPerRow = [15, 15, 15, 15, 15, 9];
  const initialSeats = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: seatsPerRow[rowIndex] }, (_, seatIndex) => ({
      row: rowIndex + 1,
      seat: seatIndex + 1,
      status: 'available',
    }))
  );

  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (row, seat) => {
    const newSeats = [...seats];
    const seatIndex = newSeats[row - 1].findIndex((s) => s.seat === seat);
    const currentSeat = newSeats[row - 1][seatIndex];

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
      </div>
    </div>
  );
};

export default CinemaHall;