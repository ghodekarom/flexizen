package com.flexizen.dao.impl;

import com.flexizen.dao.ClassDao;
import com.flexizen.model.YogaClass;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class ClassDaoImpl implements ClassDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public YogaClass save(YogaClass yogaClass) {
        entityManager.persist(yogaClass);
        return yogaClass;
    }

    @Override
    public YogaClass findById(Long id) {
        return entityManager.find(YogaClass.class, id);
    }

    @Override
    public List<YogaClass> findAll() {
        return entityManager.createQuery("SELECT c FROM YogaClass c ORDER BY c.createdAt DESC", YogaClass.class)
                .getResultList();
    }

    @Override
    public YogaClass update(YogaClass yogaClass) {
        return entityManager.merge(yogaClass);
    }

    @Override
    public void delete(Long id) {
        YogaClass yogaClass = findById(id);
        if (yogaClass != null) {
            entityManager.remove(yogaClass);
        }
    }
}
