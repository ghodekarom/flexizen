package com.flexizen.dao;

import com.flexizen.model.Enquiry;
import java.util.List;

public interface EnquiryDao {
    Enquiry save(Enquiry enquiry);
    Enquiry findById(Long id);
    List<Enquiry> findAll();
    Enquiry update(Enquiry enquiry);
    void delete(Long id);
    List<Enquiry> findByDateRange(java.time.LocalDate startDate, java.time.LocalDate endDate);
}
