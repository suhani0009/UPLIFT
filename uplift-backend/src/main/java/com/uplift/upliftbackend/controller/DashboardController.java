package com.uplift.upliftbackend.controller;

import com.uplift.upliftbackend.dto.DashboardSummary;
import com.uplift.upliftbackend.service.DashboardService;
import org.springframework.web.bind.annotation.*;

import com.uplift.upliftbackend.dto.RecentDonationSummary;
import java.util.List;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public DashboardSummary getSummary() {
        return dashboardService.getSummary();
    }
    @GetMapping("/categories")
    public Map<String, BigDecimal> getDonationTotalsByCategory() {
        return dashboardService.getDonationTotalsByCategory();
    }
    @GetMapping("/recent-donations")
    public List<RecentDonationSummary> getRecentDonations() {
        return dashboardService.getRecentDonations();
    }
}
