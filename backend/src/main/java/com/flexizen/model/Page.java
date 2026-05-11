package com.flexizen.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entity representing a CMS-managed page (About Us / Contact Us).
 * Maps to the 'page' table in PostgreSQL.
 *
 * Only two page types exist: ABOUT_US and CONTACT_US.
 * These are seeded in the database — see docs/db-init.sql.
 * Admin can update the content via the admin panel.
 */
@Entity
@Table(name = "page")
public class Page {

    /**
     * Valid page types as per SRS.
     */
    public enum PageType {
        ABOUT_US,
        CONTACT_US
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "page_type", nullable = false, unique = true, length = 20)
    private PageType pageType;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ---- Lifecycle Callbacks ----

    @PrePersist
    protected void onCreate() {
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // ---- Constructors ----

    public Page() {
    }

    // ---- Getters & Setters ----

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PageType getPageType() {
        return pageType;
    }

    public void setPageType(PageType pageType) {
        this.pageType = pageType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "Page{id=" + id + ", pageType=" + pageType + "}";
    }
}
