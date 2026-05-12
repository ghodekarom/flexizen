package com.flexizen.service;

import com.flexizen.model.Booking;
import com.flexizen.model.enums.BookingStatus;
import java.util.List;

public interface BookingService {
    List<Booking> getAllBookings();
    List<Booking> getBookingsByStatus(BookingStatus status);
    Booking getBookingByNumber(String bookingNumber);
    Booking updateBookingStatus(Long id, BookingStatus status);
}
