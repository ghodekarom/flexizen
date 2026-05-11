package com.flexizen.exception;

/**
 * Thrown when an operation requires authentication or
 * the current user does not have sufficient privileges.
 */
public class UnauthorizedException extends RuntimeException {

    public UnauthorizedException(String message) {
        super(message);
    }

    public UnauthorizedException() {
        super("Unauthorized access. Please log in.");
    }
}
