package com.flexizen.service.impl;

import com.flexizen.dao.EnquiryDao;
import com.flexizen.exception.ResourceNotFoundException;
import com.flexizen.model.Enquiry;
import com.flexizen.service.EnquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class EnquiryServiceImpl implements EnquiryService {

    @Autowired
    private EnquiryDao enquiryDao;

    @Override
    @Transactional(readOnly = true)
    public List<Enquiry> getAllEnquiries() {
        return enquiryDao.findAll();
    }

    @Override
    public Enquiry markAsRead(Long id) {
        Enquiry enquiry = enquiryDao.findById(id);
        if (enquiry == null) {
            throw new ResourceNotFoundException("Enquiry", id);
        }
        enquiry.setRead(true);
        return enquiryDao.update(enquiry);
    }

    @Override
    public void deleteEnquiry(Long id) {
        Enquiry enquiry = enquiryDao.findById(id);
        if (enquiry == null) {
            throw new ResourceNotFoundException("Enquiry", id);
        }
        enquiryDao.delete(id);
    }
}
