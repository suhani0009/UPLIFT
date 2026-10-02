package com.uplift.upliftbackend.dto;

import java.time.LocalDateTime;

public class EngagementRequest {

    private Long donorId;
    private String activityType;
    private String campaignName;
    private LocalDateTime engagementDate;
    private String status;
    private String notes;

    public EngagementRequest() {
    }

    public Long getDonorId() {
        return donorId;
    }

    public void setDonorId(Long donorId) {
        this.donorId = donorId;
    }

    public String getActivityType() {
        return activityType;
    }

    public void setActivityType(String activityType) {
        this.activityType = activityType;
    }

    public String getCampaignName() {
        return campaignName;
    }

    public void setCampaignName(String campaignName) {
        this.campaignName = campaignName;
    }

    public LocalDateTime getEngagementDate() {
        return engagementDate;
    }

    public void setEngagementDate(LocalDateTime engagementDate) {
        this.engagementDate = engagementDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}