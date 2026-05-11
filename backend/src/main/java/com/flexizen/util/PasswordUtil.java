package com.flexizen.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Utility class for password hashing and verification using BCrypt.
 *
 * Usage:
 *   String hashed = PasswordUtil.hashPassword("plainText");
 *   boolean matches = PasswordUtil.matches("plainText", hashed);
 */
public final class PasswordUtil {

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    private PasswordUtil() {
        // Prevent instantiation
    }

    /**
     * Hash a plain-text password using BCrypt.
     *
     * @param rawPassword the plain-text password
     * @return BCrypt hashed password
     */
    public static String hashPassword(String rawPassword) {
        return encoder.encode(rawPassword);
    }

    /**
     * Verify a plain-text password against a BCrypt hash.
     *
     * @param rawPassword    the plain-text password to check
     * @param hashedPassword the stored BCrypt hash
     * @return true if the password matches the hash
     */
    public static boolean matches(String rawPassword, String hashedPassword) {
        return encoder.matches(rawPassword, hashedPassword);
    }

    /**
     * Convenience method to generate a hash for seeding the database.
     * Run this main method to generate a hash for the initial admin password.
     */
    public static void main(String[] args) {
        if (args.length > 0) {
            System.out.println("BCrypt hash: " + hashPassword(args[0]));
        } else {
            System.out.println("BCrypt hash for 'admin123': " + hashPassword("admin123"));
        }
    }
}
