package com.flexizen.service;

import com.flexizen.model.Booking;
import com.flexizen.model.Enquiry;
import com.flexizen.model.Page;
import com.flexizen.model.YogaClass;
import com.flexizen.model.enums.PageType;
import java.util.List;

public interface PublicService {
    Page getPageContent(PageType type);
    List<YogaClass> getActiveClasses();
    YogaClass getClassDetails(Long id);
    Booking submitBooking(Booking booking);
    Enquiry submitEnquiry(Enquiry enquiry);
}
