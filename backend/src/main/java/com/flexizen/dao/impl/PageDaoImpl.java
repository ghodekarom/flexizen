package com.flexizen.dao.impl;

import com.flexizen.dao.PageDao;
import com.flexizen.model.Page;
import com.flexizen.model.enums.PageType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

@Repository
public class PageDaoImpl implements PageDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page findByType(PageType type) {
        try {
            return entityManager.createQuery("SELECT p FROM Page p WHERE p.type = :type", Page.class)
                    .setParameter("type", type)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public Page update(Page page) {
        return entityManager.merge(page);
    }
}
