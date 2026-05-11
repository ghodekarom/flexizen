package com.flexizen.util;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Standard API response wrapper.
 * All controller responses should use this format for consistency.
 *
 * Format: { "status": "success|error", "message": "...", "data": ... }
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    private String status;
    private String message;
    private T data;

    // ---- Constructors ----

    public ApiResponse() {
    }

    public ApiResponse(String status, String message) {
        this.status = status;
        this.message = message;
    }

    public ApiResponse(String status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    // ---- Factory Methods ----

    public static <T> ApiResponse<T> success(String message) {
        return new ApiResponse<>("success", message);
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>("success", message, data);
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>("error", message);
    }

    // ---- Getters & Setters ----

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
