package com.flexizen.controller;

import com.flexizen.model.Admin;
import com.flexizen.service.AuthService;
import com.flexizen.util.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * REST controller for authentication endpoints.
 *
 * POST /api/auth/login   — Admin login (creates session)
 * POST /api/auth/logout  — Admin logout (handled by Spring Security filter)
 * GET  /api/auth/session  — Check current session status
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, Object>>> login(
            @RequestBody Map<String, String> credentials,
            HttpServletRequest request) {

        String username = credentials.get("username");
        String password = credentials.get("password");

        if (username == null || username.isBlank() || password == null || password.isBlank()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Username and password are required"));
        }

        try {
            logger.info(">>> LOGIN ATTEMPT: username=[{}], password=[{}]", username, password);
            Admin admin = authService.validateCredentials(username, password);
            
            if (admin != null) {
                logger.info(">>> LOGIN SUCCESS: Manually creating session for admin.");
                
                // Create a manual authentication token
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        admin.getUsername(), null, 
                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")));
                
                SecurityContextHolder.getContext().setAuthentication(auth);
                
                // Create session manually
                HttpSession session = request.getSession(true);
                session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

                Map<String, Object> adminData = new LinkedHashMap<>();
                adminData.put("username", admin.getUsername());
                adminData.put("name", admin.getName());
                adminData.put("email", admin.getEmail());

                return ResponseEntity.ok(ApiResponse.success("Login successful", adminData));
            }

            logger.error(">>> LOGIN FAILED: Manual validation failed.");
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Invalid username or password"));

        } catch (Exception e) {
            logger.error(">>> LOGIN ERROR: Exception during authentication", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("An internal error occurred during login"));
        }
    }

    /**
     * POST /api/auth/logout
     *
     * Invalidates the current session.
     * Note: Spring Security's logout filter also handles this via spring-security.xml config,
     * but this endpoint provides a JSON response.
     */
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        SecurityContextHolder.clearContext();

        logger.info("Admin logged out");

        return ResponseEntity.ok(ApiResponse.success("Logged out successfully"));
    }

    /**
     * GET /api/auth/session
     *
     * Checks if the current request has a valid authenticated session.
     * Frontend calls this on app load to determine login state.
     */
    @GetMapping("/session")
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkSession() {
        Admin admin = authService.getCurrentAdmin();

        if (admin == null) {
            Map<String, Object> data = new LinkedHashMap<>();
            data.put("authenticated", false);
            return ResponseEntity.ok(ApiResponse.success("Not authenticated", data));
        }

        Map<String, Object> data = new LinkedHashMap<>();
        data.put("authenticated", true);
        data.put("username", admin.getUsername());
        data.put("name", admin.getName());
        data.put("email", admin.getEmail());

        return ResponseEntity.ok(ApiResponse.success("Authenticated", data));
    }
}
