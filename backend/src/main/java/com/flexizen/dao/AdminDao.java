package com.flexizen.dao;

import com.flexizen.model.Admin;

/**
 * Data Access Object interface for Admin entity.
 * Uses EntityManager directly — no Spring Data JPA.
 */
public interface AdminDao {

    /**
     * Find admin by username.
     *
     * @param username the admin's username
     * @return the Admin entity, or null if not found
     */
    Admin findByUsername(String username);

    /**
     * Find admin by ID.
     *
     * @param id the admin's ID
     * @return the Admin entity, or null if not found
     */
    Admin findById(Long id);

    /**
     * Update an existing admin record.
     *
     * @param admin the updated admin entity
     * @return the merged admin entity
     */
    Admin update(Admin admin);
}
