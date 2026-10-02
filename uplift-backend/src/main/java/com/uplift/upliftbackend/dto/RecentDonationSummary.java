package com.uplift.upliftbackend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class RecentDonationSummary {

    private String donorName;
    private BigDecimal amount;
    private String category;
    private LocalDateTime date;
    private String paymentMethod;
    private String status;

    public RecentDonationSummary() {
    }

    public RecentDonationSummary(
            String donorName,
            BigDecimal amount,
            String category,
            LocalDateTime date,
            String paymentMethod,
            String status) {

        this.donorName = donorName;
        this.amount = amount;
        this.category = category;
        this.date = date;
        this.paymentMethod = paymentMethod;
        this.status = status;
    }

    public String getDonorName() {
        return donorName;
    }

    public void setDonorName(String donorName) {
        this.donorName = donorName;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}