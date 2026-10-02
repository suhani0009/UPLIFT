package com.uplift.upliftbackend.dto;

import java.math.BigDecimal;
import java.util.List;

public class Donor360Response {

    private Long donorId;
    private String name;
    private String email;
    private String phone;
    private String donorType;

    private BigDecimal totalDonated;
    private int totalDonations;

    private List<DonationSummary> donations;
    private List<CommunicationSummary> communications;
    private List<EngagementSummary> engagements;
    private List<ContributionRequestSummary> contributions;

    public Donor360Response() {
    }

    public Long getDonorId() {
        return donorId;
    }

    public void setDonorId(Long donorId) {
        this.donorId = donorId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDonorType() {
        return donorType;
    }

    public void setDonorType(String donorType) {
        this.donorType = donorType;
    }

    public BigDecimal getTotalDonated() {
        return totalDonated;
    }

    public void setTotalDonated(BigDecimal totalDonated) {
        this.totalDonated = totalDonated;
    }

    public int getTotalDonations() {
        return totalDonations;
    }

    public void setTotalDonations(int totalDonations) {
        this.totalDonations = totalDonations;
    }

    public List<DonationSummary> getDonations() {
        return donations;
    }

    public void setDonations(List<DonationSummary> donations) {
        this.donations = donations;
    }

    public List<CommunicationSummary> getCommunications() {
        return communications;
    }

    public void setCommunications(List<CommunicationSummary> communications) {
        this.communications = communications;
    }

    public List<EngagementSummary> getEngagements() {
        return engagements;
    }


    public void setEngagements(List<EngagementSummary> engagements) {
        this.engagements = engagements;
    }

    public List<ContributionRequestSummary> getContributions() {
        return contributions;
    }

    public void setContributions(List<ContributionRequestSummary> contributions) {
        this.contributions = contributions;
    }
}