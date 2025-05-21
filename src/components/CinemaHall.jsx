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
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      BookingService.saveBooking(id, selectedSeats, formData);
      setShowForm(false);
      setSelectedSeats([]);
      const newSeats = [...seats];
      selectedSeats.forEach((seat) => {
        const rowIndex = seat.row - 1;
        const seatIndex = newSeats[rowIndex].findIndex((s) => s.seat === seat.seat);
        newSeats[rowIndex][seatIndex].status = 'booked';
      });
      setSeats(newSeats);
      alert('Booking successful!');
    }
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
          <button className="book-button" onClick={handleBooking}>
            Забронювати
          </button>
        )}
      </div>
      {showForm && (
        <div className="booking-form">
          <h3>Введіть дані для бронювання</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Ім'я"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div>
              <input
                type="text"
                name="phone"
                placeholder="Телефон"
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Емейл"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <button type="submit">Підтвердити</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CinemaHall;