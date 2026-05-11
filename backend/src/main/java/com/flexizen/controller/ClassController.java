package com.flexizen.controller;

import com.flexizen.model.YogaClass;
import com.flexizen.service.ClassService;
import com.flexizen.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/classes")
public class ClassController {

    @Autowired
    private ClassService classService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<YogaClass>>> getAllClasses() {
        return ResponseEntity.ok(ApiResponse.success("Classes fetched successfully", classService.getAllClasses()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<YogaClass>> getClassById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Class found", classService.getClassById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<YogaClass>> createClass(@RequestBody YogaClass yogaClass) {
        return ResponseEntity.ok(ApiResponse.success("Class created successfully", classService.createClass(yogaClass)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<YogaClass>> updateClass(@PathVariable Long id, @RequestBody YogaClass yogaClass) {
        return ResponseEntity.ok(ApiResponse.success("Class updated successfully", classService.updateClass(id, yogaClass)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteClass(@PathVariable Long id) {
        classService.deleteClass(id);
        return ResponseEntity.ok(ApiResponse.success("Class deleted successfully"));
    }
}
