package com.flexizen.service;

import com.flexizen.model.Admin;

public interface AdminService {
    Admin getAdminProfile();
    Admin updateProfile(Admin adminDetails);
    void changePassword(String oldPassword, String newPassword);
}
