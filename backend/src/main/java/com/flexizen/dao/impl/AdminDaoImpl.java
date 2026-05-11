package com.flexizen.dao.impl;

import com.flexizen.dao.AdminDao;
import com.flexizen.model.Admin;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

/**
 * EntityManager-based implementation of AdminDao.
 * Uses JPQL queries — no Spring Data JPA repositories.
 */
@Repository
public class AdminDaoImpl implements AdminDao {

    private static final Logger logger = LoggerFactory.getLogger(AdminDaoImpl.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Admin findByUsername(String username) {
        try {
            return entityManager
                    .createQuery("SELECT a FROM Admin a WHERE a.username = :username", Admin.class)
                    .setParameter("username", username)
                    .getSingleResult();
        } catch (NoResultException e) {
            logger.debug("Admin not found with username: {}", username);
            return null;
        }
    }

    @Override
    public Admin findById(Long id) {
        return entityManager.find(Admin.class, id);
    }

    @Override
    public Admin update(Admin admin) {
        return entityManager.merge(admin);
    }
}
