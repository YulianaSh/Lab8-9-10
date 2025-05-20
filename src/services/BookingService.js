const BookingService = {
  saveBooking: (movieId, seats, userData) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '{}');
    if (!bookings[movieId]) {
      bookings[movieId] = [];
    }
    bookings[movieId].push({ seats, userData, timestamp: new Date().toISOString() });
    localStorage.setItem('bookings', JSON.stringify(bookings));
  },

  getBookedSeats: (movieId) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '{}');
    return bookings[movieId] ? bookings[movieId].flatMap((booking) => booking.seats) : [];
  },
};

export default BookingService;