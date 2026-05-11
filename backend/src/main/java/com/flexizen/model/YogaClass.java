package com.flexizen.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Entity representing a yoga class offered by FlexiZen.
 * Maps to the 'yoga_class' table in PostgreSQL.
 */
@Entity
@Table(name = "yoga_class")
public class YogaClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    /**
     * Schedule as a human-readable string.
     * Example: "Monday & Wednesday, 6:00 AM – 7:00 AM"
     */
    @Column(name = "schedule", nullable = false, length = 100)
    private String schedule;

    @Column(name = "capacity", nullable = false)
    private Integer capacity;

    @Column(name = "fee", nullable = false, precision = 10, scale = 2)
    private BigDecimal fee;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    /**
     * Bookings linked to this class.
     * Lazy-loaded to avoid N+1 issues.
     */
    @OneToMany(mappedBy = "yogaClass", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Booking> bookings;

    // ---- Lifecycle Callbacks ----

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // ---- Constructors ----

    public YogaClass() {
    }

    // ---- Getters & Setters ----

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public String getSchedule() {
        return schedule;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public BigDecimal getFee() {
        return fee;
    }

    public void setFee(BigDecimal fee) {
        this.fee = fee;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    @Override
    public String toString() {
        return "YogaClass{id=" + id + ", name='" + name + "', schedule='" + schedule + "'}";
    }
}
