package com.flexizen.dao.impl;

import com.flexizen.dao.BookingDao;
import com.flexizen.model.Booking;
import com.flexizen.model.enums.BookingStatus;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class BookingDaoImpl implements BookingDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Booking save(Booking booking) {
        entityManager.persist(booking);
        return booking;
    }

    @Override
    public Booking findById(Long id) {
        return entityManager.find(Booking.class, id);
    }

    @Override
    public Booking findByBookingNumber(String bookingNumber) {
        try {
            return entityManager.createQuery("SELECT b FROM Booking b WHERE b.bookingNumber = :num", Booking.class)
                    .setParameter("num", bookingNumber)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public List<Booking> findAll() {
        return entityManager.createQuery("SELECT b FROM Booking b ORDER BY b.createdAt DESC", Booking.class)
                .getResultList();
    }

    @Override
    public List<Booking> findByStatus(BookingStatus status) {
        return entityManager.createQuery("SELECT b FROM Booking b WHERE b.status = :status ORDER BY b.createdAt DESC", Booking.class)
                .setParameter("status", status)
                .getResultList();
    }

    @Override
    public Booking update(Booking booking) {
        return entityManager.merge(booking);
    }

    @Override
    public long countByClassId(Long classId) {
        return (long) entityManager.createQuery("SELECT COUNT(b) FROM Booking b WHERE b.yogaClass.id = :classId AND b.status != 'CANCELLED'")
                .setParameter("classId", classId)
                .getSingleResult();
    }
    @Override
    public List<Booking> findByDateRange(java.time.LocalDate startDate, java.time.LocalDate endDate) {
        return entityManager.createQuery(
                "SELECT b FROM Booking b WHERE CAST(b.createdAt AS date) BETWEEN :startDate AND :endDate ORDER BY b.createdAt DESC", 
                Booking.class)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .getResultList();
    }
}
