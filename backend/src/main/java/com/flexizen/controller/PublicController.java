package com.flexizen.controller;

import com.flexizen.model.Booking;
import com.flexizen.model.Enquiry;
import com.flexizen.model.Page;
import com.flexizen.model.YogaClass;
import com.flexizen.model.enums.PageType;
import com.flexizen.service.PublicService;
import com.flexizen.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    private PublicService publicService;

    @GetMapping("/classes")
    public ResponseEntity<ApiResponse<List<YogaClass>>> getClasses() {
        return ResponseEntity.ok(ApiResponse.success("Classes fetched", publicService.getActiveClasses()));
    }

    @GetMapping("/classes/{id}")
    public ResponseEntity<ApiResponse<YogaClass>> getClassDetails(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Class details fetched", publicService.getClassDetails(id)));
    }

    @GetMapping("/pages/{type}")
    public ResponseEntity<ApiResponse<Page>> getPage(@PathVariable String type) {
        PageType pageType = PageType.valueOf(type.toUpperCase());
        return ResponseEntity.ok(ApiResponse.success("Page content fetched", publicService.getPageContent(pageType)));
    }

    @PostMapping("/bookings")
    public ResponseEntity<ApiResponse<Booking>> createBooking(@RequestBody Booking booking) {
        try {
            return ResponseEntity.ok(ApiResponse.success("Booking submitted successfully", publicService.submitBooking(booking)));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/enquiries")
    public ResponseEntity<ApiResponse<Enquiry>> createEnquiry(@RequestBody Enquiry enquiry) {
        return ResponseEntity.ok(ApiResponse.success("Enquiry submitted successfully", publicService.submitEnquiry(enquiry)));
    }
}
