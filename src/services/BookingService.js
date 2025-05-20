const BookingService = {
  getBookedSeats: (movieId) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '{}');
    return bookings[movieId] ? bookings[movieId].flatMap((booking) => booking.seats) : [];
  },
};

export default BookingService;