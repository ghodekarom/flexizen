package com.flexizen.util;

import java.util.UUID;

public class BookingNumberUtil {
    public static String generate() {
        return "FX-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
