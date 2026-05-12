package com.flexizen.controller;

import com.flexizen.model.Booking;
import com.flexizen.model.enums.BookingStatus;
import com.flexizen.service.BookingService;
import com.flexizen.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Booking>>> getAll(@RequestParam(required = false) BookingStatus status) {
        List<Booking> bookings = (status != null) ? bookingService.getBookingsByStatus(status) : bookingService.getAllBookings();
        return ResponseEntity.ok(ApiResponse.success("Bookings fetched", bookings));
    }

    @GetMapping("/search/{bookingNumber}")
    public ResponseEntity<ApiResponse<Booking>> getByNumber(@PathVariable String bookingNumber) {
        try {
            return ResponseEntity.ok(ApiResponse.success("Booking found", bookingService.getBookingByNumber(bookingNumber)));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Booking>> updateStatus(@PathVariable Long id, @RequestParam BookingStatus status) {
        try {
            return ResponseEntity.ok(ApiResponse.success("Booking status updated", bookingService.updateBookingStatus(id, status)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
