package com.uplift.upliftbackend.service;

import com.uplift.upliftbackend.entity.Centre;
import com.uplift.upliftbackend.entity.Donation;
import com.uplift.upliftbackend.repository.DonationRepository;
import org.springframework.stereotype.Service;
import com.uplift.upliftbackend.dto.DonationRequest;
import com.uplift.upliftbackend.entity.Donor;
import com.uplift.upliftbackend.repository.DonorRepository;
import com.uplift.upliftbackend.repository.CentreRepository;


import java.util.List;

@Service
public class DonationService {

    private final DonationRepository donationRepository;
    private final DonorRepository donorRepository;
    private final CentreRepository centreRepository;

    public DonationService(
            DonationRepository donationRepository,
            DonorRepository donorRepository,
            CentreRepository centreRepository) {

        this.donationRepository = donationRepository;
        this.donorRepository = donorRepository;
        this.centreRepository = centreRepository;
    }


    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    public Donation getDonationById(Long id) {
        return donationRepository.findById(id).orElse(null);
    }

    public Donation createDonation(DonationRequest request) {

        Donor donor = donorRepository.findById(request.getDonorId())
                .orElseThrow(() -> new RuntimeException("Donor not found"));

        Centre centre = null;

        if (request.getCentreId() != null) {
            centre = centreRepository.findById(request.getCentreId())
                    .orElseThrow(() -> new RuntimeException("Centre not found"));
        }

        Donation donation = new Donation();

        donation.setDonor(donor);
        donation.setCentre(centre);
        donation.setAmount(request.getAmount());
        donation.setDonationDate(request.getDonationDate());
        donation.setDonationCategory(request.getDonationCategory());
        donation.setItemDescription(request.getItemDescription());
        donation.setDonationType(request.getDonationType());
        donation.setPaymentMethod(request.getPaymentMethod());
        donation.setStatus(request.getStatus());
        donation.setSource(request.getSource());

        return donationRepository.save(donation);
    }
}
