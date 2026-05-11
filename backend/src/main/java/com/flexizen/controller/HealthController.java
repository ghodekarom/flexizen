package com.flexizen.controller;

import com.flexizen.util.ApiResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Health check controller to verify the application is running
 * and the database connection is active.
 *
 * This is used during Phase 1 to confirm the setup is correct.
 */
@RestController
@RequestMapping("/api")
public class HealthController {

    private static final Logger logger = LoggerFactory.getLogger(HealthController.class);

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * GET /api/health
     * Returns application status and database connectivity.
     */
    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> healthCheck() {
        Map<String, Object> healthData = new LinkedHashMap<>();
        healthData.put("application", "FlexiZen Backend");
        healthData.put("version", "1.0-SNAPSHOT");

        // Check database connectivity
        try {
            Object result = entityManager.createNativeQuery("SELECT 1").getSingleResult();
            healthData.put("database", "connected");
            healthData.put("dbCheck", result.toString());
            logger.info("Health check passed — database connected");
        } catch (Exception e) {
            healthData.put("database", "disconnected");
            healthData.put("dbError", e.getMessage());
            logger.error("Health check — database connection failed", e);
            return ResponseEntity
                    .status(503)
                    .body(ApiResponse.error("Database connection failed", healthData));
        }

        return ResponseEntity.ok(ApiResponse.success("FlexiZen backend is running", healthData));
    }
}
