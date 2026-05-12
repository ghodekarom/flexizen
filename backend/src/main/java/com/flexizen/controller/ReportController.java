package com.flexizen.controller;

import com.flexizen.model.Booking;
import com.flexizen.model.Enquiry;
import com.flexizen.service.ReportService;
import com.flexizen.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/admin/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/bookings")
    public ResponseEntity<ApiResponse<List<Booking>>> getBookingReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<Booking> report = reportService.getBookingReport(startDate, endDate);
        return ResponseEntity.ok(ApiResponse.success("Booking report fetched", report));
    }

    @GetMapping("/enquiries")
    public ResponseEntity<ApiResponse<List<Enquiry>>> getEnquiryReport(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<Enquiry> report = reportService.getEnquiryReport(startDate, endDate);
        return ResponseEntity.ok(ApiResponse.success("Enquiry report fetched", report));
    }
}
