package com.flexizen.service;

import com.flexizen.model.Booking;
import com.flexizen.model.Enquiry;
import java.time.LocalDate;
import java.util.List;

public interface ReportService {
    List<Booking> getBookingReport(LocalDate startDate, LocalDate endDate);
    List<Enquiry> getEnquiryReport(LocalDate startDate, LocalDate endDate);
}
