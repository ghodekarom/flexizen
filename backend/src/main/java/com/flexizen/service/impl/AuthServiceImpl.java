package com.flexizen.service.impl;

import com.flexizen.dao.AdminDao;
import com.flexizen.model.Admin;
import com.flexizen.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Implementation of AuthService.
 * Validates credentials using BCrypt and manages session state
 * via Spring Security's SecurityContext.
 */
@Service
@Transactional(readOnly = true)
public class AuthServiceImpl implements AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    @Autowired
    private AdminDao adminDao;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public Admin validateCredentials(String username, String rawPassword) {
        Admin admin = adminDao.findByUsername(username);
        if (admin == null) {
            logger.warn("Login failed — admin not found: {}", username);
            return null;
        }

        if (!passwordEncoder.matches(rawPassword, admin.getPassword())) {
            logger.warn("Login failed — invalid password for: {}", username);
            return null;
        }

        logger.info("Login successful for: {}", username);
        return admin;
    }

    @Override
    public Admin getCurrentAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()
                || "anonymousUser".equals(authentication.getPrincipal())) {
            return null;
        }

        String username = authentication.getName();
        return adminDao.findByUsername(username);
    }
}
