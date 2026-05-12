package com.flexizen.dao.impl;

import com.flexizen.dao.EnquiryDao;
import com.flexizen.model.Enquiry;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class EnquiryDaoImpl implements EnquiryDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Enquiry save(Enquiry enquiry) {
        entityManager.persist(enquiry);
        return enquiry;
    }

    @Override
    public Enquiry findById(Long id) {
        return entityManager.find(Enquiry.class, id);
    }

    @Override
    public List<Enquiry> findAll() {
        return entityManager.createQuery("SELECT e FROM Enquiry e ORDER BY e.createdAt DESC", Enquiry.class)
                .getResultList();
    }

    @Override
    public Enquiry update(Enquiry enquiry) {
        return entityManager.merge(enquiry);
    }

    @Override
    public void delete(Long id) {
        Enquiry enquiry = findById(id);
        if (enquiry != null) {
            entityManager.remove(enquiry);
        }
    }
    @Override
    public List<Enquiry> findByDateRange(java.time.LocalDate startDate, java.time.LocalDate endDate) {
        return entityManager.createQuery(
                "SELECT e FROM Enquiry e WHERE CAST(e.createdAt AS date) BETWEEN :startDate AND :endDate ORDER BY e.createdAt DESC", 
                Enquiry.class)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .getResultList();
    }
}
