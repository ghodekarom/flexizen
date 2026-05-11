package com.flexizen.service;

import com.flexizen.model.Admin;

/**
 * Service interface for authentication operations.
 */
public interface AuthService {

    /**
     * Validate admin credentials.
     *
     * @param username the admin's username
     * @param rawPassword the plain-text password to verify
     * @return the Admin entity if credentials are valid, null otherwise
     */
    Admin validateCredentials(String username, String rawPassword);

    /**
     * Get the currently authenticated admin from the session.
     *
     * @return the Admin entity if authenticated, null otherwise
     */
    Admin getCurrentAdmin();
}
