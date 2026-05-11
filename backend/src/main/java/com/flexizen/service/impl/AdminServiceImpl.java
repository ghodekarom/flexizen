package com.flexizen.service.impl;

import com.flexizen.dao.AdminDao;
import com.flexizen.exception.UnauthorizedException;
import com.flexizen.model.Admin;
import com.flexizen.service.AdminService;
import com.flexizen.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminDao adminDao;

    @Autowired
    private AuthService authService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public Admin getAdminProfile() {
        Admin current = authService.getCurrentAdmin();
        if (current == null) throw new UnauthorizedException();
        return current;
    }

    @Override
    public Admin updateProfile(Admin adminDetails) {
        Admin current = getAdminProfile();
        current.setName(adminDetails.getName());
        current.setEmail(adminDetails.getEmail());
        current.setPhone(adminDetails.getPhone());
        return adminDao.update(current);
    }

    @Override
    public void changePassword(String oldPassword, String newPassword) {
        Admin current = getAdminProfile();
        
        if (!passwordEncoder.matches(oldPassword, current.getPassword())) {
            throw new IllegalArgumentException("Incorrect old password");
        }
        
        current.setPassword(passwordEncoder.encode(newPassword));
        adminDao.update(current);
    }
}
