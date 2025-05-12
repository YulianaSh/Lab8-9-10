const CinemaHall = () => {
  const rows = 6;
  const seatsPerRow = [15, 15, 15, 15, 15, 9]; 

  const seats = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: seatsPerRow[rowIndex] }, (_, seatIndex) => ({
      row: rowIndex + 1,
      seat: seatIndex + 1,
      status: 'available', 
    }))
  );

  return (
    <div className="cinema-hall">
      <div className="screen">Екран</div>
      <div className="seats-container">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            <span className="row-number">{rowIndex + 1}</span>
            {row.map((seat) => (
              <button key={seat.seat} className="seat available">
                {seat.seat}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemaHall;