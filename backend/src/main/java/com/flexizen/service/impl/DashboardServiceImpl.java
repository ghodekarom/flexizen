package com.flexizen.service.impl;

import com.flexizen.service.DashboardService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Map<String, Long> getDashboardStats() {
        Map<String, Long> stats = new HashMap<>();
        
        stats.put("totalClasses", (Long) entityManager.createQuery("SELECT COUNT(c) FROM YogaClass c").getSingleResult());
        stats.put("totalBookings", (Long) entityManager.createQuery("SELECT COUNT(b) FROM Booking b").getSingleResult());
        stats.put("newBookings", (Long) entityManager.createQuery("SELECT COUNT(b) FROM Booking b WHERE b.status = 'PENDING'").getSingleResult());
        stats.put("approvedBookings", (Long) entityManager.createQuery("SELECT COUNT(b) FROM Booking b WHERE b.status = 'APPROVED'").getSingleResult());
        stats.put("cancelledBookings", (Long) entityManager.createQuery("SELECT COUNT(b) FROM Booking b WHERE b.status = 'CANCELLED'").getSingleResult());
        stats.put("totalEnquiries", (Long) entityManager.createQuery("SELECT COUNT(e) FROM Enquiry e").getSingleResult());
        stats.put("unreadEnquiries", (Long) entityManager.createQuery("SELECT COUNT(e) FROM Enquiry e WHERE e.isRead = false").getSingleResult());
        stats.put("readEnquiries", (Long) entityManager.createQuery("SELECT COUNT(e) FROM Enquiry e WHERE e.isRead = true").getSingleResult());
        
        return stats;
    }
}
