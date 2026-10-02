package com.uplift.upliftbackend.dto;

import java.time.LocalDateTime;

public class CommunicationRequest {

    private Long donorId;
    private String communicationType;
    private String message;
    private LocalDateTime communicationDate;
    private String status;

    public CommunicationRequest() {
    }

    public String getCommunicationType() {
        return communicationType;
    }

    public void setCommunicationType(String communicationType) {
        this.communicationType = communicationType;
    }

    public Long getDonorId() {
        return donorId;
    }

    public void setDonorId(Long donorId) {
        this.donorId = donorId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getCommunicationDate() {
        return communicationDate;
    }

    public void setCommunicationDate(LocalDateTime communicationDate) {
        this.communicationDate = communicationDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
