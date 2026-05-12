package com.flexizen.service.impl;

import com.flexizen.dao.BookingDao;
import com.flexizen.exception.ResourceNotFoundException;
import com.flexizen.model.Booking;
import com.flexizen.model.enums.BookingStatus;
import com.flexizen.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingDao bookingDao;

    @Override
    @Transactional(readOnly = true)
    public List<Booking> getAllBookings() {
        return bookingDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Booking> getBookingsByStatus(BookingStatus status) {
        return bookingDao.findByStatus(status);
    }

    @Override
    @Transactional(readOnly = true)
    public Booking getBookingByNumber(String bookingNumber) {
        Booking booking = bookingDao.findByBookingNumber(bookingNumber);
        if (booking == null) {
            throw new ResourceNotFoundException("Booking", bookingNumber);
        }
        return booking;
    }

    @Override
    public Booking updateBookingStatus(Long id, BookingStatus status) {
        Booking booking = bookingDao.findById(id);
        if (booking == null) {
            throw new ResourceNotFoundException("Booking", id);
        }
        booking.setStatus(status);
        return bookingDao.update(booking);
    }
}
