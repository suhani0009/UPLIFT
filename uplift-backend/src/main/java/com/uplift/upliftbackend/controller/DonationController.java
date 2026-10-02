package com.uplift.upliftbackend.controller;

import com.uplift.upliftbackend.entity.Donation;
import com.uplift.upliftbackend.service.DonationService;
import org.springframework.web.bind.annotation.*;
import com.uplift.upliftbackend.dto.DonationRequest;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
public class DonationController {

    private final DonationService donationService;

    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    @GetMapping
    public List<Donation> getAllDonations() {
        return donationService.getAllDonations();
    }

    @GetMapping("/{id}")
    public Donation getDonationById(@PathVariable Long id) {
        return donationService.getDonationById(id);
    }

    @PostMapping
    public Donation createDonation(@RequestBody DonationRequest request) {
        return donationService.createDonation(request);
    }
}
