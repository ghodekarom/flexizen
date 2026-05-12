package com.flexizen.service.impl;

import com.flexizen.dao.BookingDao;
import com.flexizen.dao.EnquiryDao;
import com.flexizen.model.Booking;
import com.flexizen.model.Enquiry;
import com.flexizen.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class ReportServiceImpl implements ReportService {

    @Autowired
    private BookingDao bookingDao;

    @Autowired
    private EnquiryDao enquiryDao;

    @Override
    public List<Booking> getBookingReport(LocalDate startDate, LocalDate endDate) {
        return bookingDao.findByDateRange(startDate, endDate);
    }

    @Override
    public List<Enquiry> getEnquiryReport(LocalDate startDate, LocalDate endDate) {
        return enquiryDao.findByDateRange(startDate, endDate);
    }
}
