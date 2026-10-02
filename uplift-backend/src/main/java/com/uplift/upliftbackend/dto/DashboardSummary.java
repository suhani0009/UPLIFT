package com.uplift.upliftbackend.dto;

import java.math.BigDecimal;

public class DashboardSummary {

    private long totalDonors;
    private long totalDonations;
    private BigDecimal totalDonationAmount;
    private long totalTransactions;

    public DashboardSummary() {
    }

    public DashboardSummary(
            long totalDonors,
            long totalDonations,
            BigDecimal totalDonationAmount,
            long totalTransactions) {

        this.totalDonors = totalDonors;
        this.totalDonations = totalDonations;
        this.totalDonationAmount = totalDonationAmount;
        this.totalTransactions = totalTransactions;
    }

    public long getTotalDonors() {
        return totalDonors;
    }

    public void setTotalDonors(long totalDonors) {
        this.totalDonors = totalDonors;
    }

    public long getTotalDonations() {
        return totalDonations;
    }

    public void setTotalDonations(long totalDonations) {
        this.totalDonations = totalDonations;
    }

    public BigDecimal getTotalDonationAmount() {
        return totalDonationAmount;
    }

    public void setTotalDonationAmount(BigDecimal totalDonationAmount) {
        this.totalDonationAmount = totalDonationAmount;
    }

    public long getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(long totalTransactions) {
        this.totalTransactions = totalTransactions;
    }
}
