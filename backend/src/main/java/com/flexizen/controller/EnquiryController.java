package com.flexizen.controller;

import com.flexizen.model.Enquiry;
import com.flexizen.service.EnquiryService;
import com.flexizen.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/enquiries")
public class EnquiryController {

    @Autowired
    private EnquiryService enquiryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Enquiry>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Enquiries fetched", enquiryService.getAllEnquiries()));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<ApiResponse<Enquiry>> markRead(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Enquiry marked as read", enquiryService.markAsRead(id)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        enquiryService.deleteEnquiry(id);
        return ResponseEntity.ok(ApiResponse.success("Enquiry deleted"));
    }
}
