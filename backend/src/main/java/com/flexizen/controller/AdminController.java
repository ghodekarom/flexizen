package com.flexizen.controller;

import com.flexizen.model.Admin;
import com.flexizen.service.AdminService;
import com.flexizen.service.DashboardService;
import com.flexizen.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<Admin>> getProfile() {
        return ResponseEntity.ok(ApiResponse.success("Profile fetched", adminService.getAdminProfile()));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<Admin>> updateProfile(@RequestBody Admin admin) {
        return ResponseEntity.ok(ApiResponse.success("Profile updated", adminService.updateProfile(admin)));
    }

    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse<Void>> changePassword(@RequestBody Map<String, String> passwords) {
        adminService.changePassword(passwords.get("oldPassword"), passwords.get("newPassword"));
        return ResponseEntity.ok(ApiResponse.success("Password changed successfully"));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getDashboardStats() {
        return ResponseEntity.ok(ApiResponse.success("Dashboard statistics fetched", dashboardService.getDashboardStats()));
    }
}
