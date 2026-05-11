package com.flexizen.service.impl;

import com.flexizen.dao.BookingDao;
import com.flexizen.dao.ClassDao;
import com.flexizen.dao.EnquiryDao;
import com.flexizen.dao.PageDao;
import com.flexizen.model.Booking;
import com.flexizen.model.Enquiry;
import com.flexizen.model.Page;
import com.flexizen.model.YogaClass;
import com.flexizen.model.enums.BookingStatus;
import com.flexizen.model.enums.PageType;
import com.flexizen.service.PublicService;
import com.flexizen.util.BookingNumberUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class PublicServiceImpl implements PublicService {

    @Autowired
    private PageDao pageDao;

    @Autowired
    private ClassDao classDao;

    @Autowired
    private BookingDao bookingDao;

    @Autowired
    private EnquiryDao enquiryDao;

    @Override
    @Transactional(readOnly = true)
    public Page getPageContent(PageType type) {
        return pageDao.findByType(type);
    }

    @Override
    @Transactional(readOnly = true)
    public List<YogaClass> getActiveClasses() {
        return classDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public YogaClass getClassDetails(Long id) {
        return classDao.findById(id);
    }

    @Override
    public Booking submitBooking(Booking booking) {
        YogaClass yogaClass = classDao.findById(booking.getYogaClass().getId());
        if (yogaClass == null) {
            throw new IllegalArgumentException("Invalid Yoga Class ID");
        }

        // Validate capacity
        long currentBookings = bookingDao.countByClassId(yogaClass.getId());
        if (currentBookings >= yogaClass.getCapacity()) {
            throw new IllegalStateException("Class is already full");
        }

        booking.setYogaClass(yogaClass);
        booking.setBookingNumber(BookingNumberUtil.generate());
        booking.setStatus(BookingStatus.PENDING);
        
        return bookingDao.save(booking);
    }

    @Override
    public Enquiry submitEnquiry(Enquiry enquiry) {
        enquiry.setRead(false);
        return enquiryDao.save(enquiry);
    }
}
