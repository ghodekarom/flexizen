package com.flexizen.service;

import com.flexizen.model.Enquiry;
import java.util.List;

public interface EnquiryService {
    List<Enquiry> getAllEnquiries();
    Enquiry markAsRead(Long id);
    void deleteEnquiry(Long id);
}
