package com.flexizen.dao;

import com.flexizen.model.Booking;
import com.flexizen.model.enums.BookingStatus;
import java.util.List;

public interface BookingDao {
    Booking save(Booking booking);
    Booking findById(Long id);
    Booking findByBookingNumber(String bookingNumber);
    List<Booking> findAll();
    List<Booking> findByStatus(BookingStatus status);
    Booking update(Booking booking);
    long countByClassId(Long classId);
    List<Booking> findByDateRange(java.time.LocalDate startDate, java.time.LocalDate endDate);
}
