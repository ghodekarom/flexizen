package com.flexizen.service;

import com.flexizen.dao.BookingDao;
import com.flexizen.model.Booking;
import com.flexizen.model.enums.BookingStatus;
import com.flexizen.service.impl.BookingServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class BookingServiceTest {

    @Mock
    private BookingDao bookingDao;

    @InjectMocks
    private BookingServiceImpl bookingService;

    private Booking booking;

    @BeforeEach
    void setUp() {
        booking = new Booking();
        booking.setId(1L);
        booking.setBookingNumber("FZ-20260001");
        booking.setCustomerName("John Doe");
        booking.setStatus(BookingStatus.PENDING);
    }

    @Test
    void testGetAllBookings() {
        when(bookingDao.findAll()).thenReturn(Arrays.asList(booking));

        List<Booking> result = bookingService.getAllBookings();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("FZ-20260001", result.get(0).getBookingNumber());
        verify(bookingDao, times(1)).findAll();
    }

    @Test
    void testGetBookingByNumber() {
        when(bookingDao.findByBookingNumber("FZ-20260001")).thenReturn(booking);

        Booking result = bookingService.getBookingByNumber("FZ-20260001");

        assertNotNull(result);
        assertEquals("FZ-20260001", result.getBookingNumber());
        verify(bookingDao, times(1)).findByBookingNumber("FZ-20260001");
    }

    @Test
    void testUpdateBookingStatus() {
        when(bookingDao.findById(1L)).thenReturn(booking);
        when(bookingDao.update(any(Booking.class))).thenReturn(booking);

        Booking result = bookingService.updateBookingStatus(1L, BookingStatus.APPROVED);

        assertNotNull(result);
        assertEquals(BookingStatus.APPROVED, result.getStatus());
        verify(bookingDao, times(1)).findById(1L);
        verify(bookingDao, times(1)).update(any(Booking.class));
    }
}
