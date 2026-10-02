package com.uplift.upliftbackend.service;

import com.uplift.upliftbackend.dto.EngagementRequest;
import com.uplift.upliftbackend.entity.Donor;
import com.uplift.upliftbackend.entity.Engagement;
import com.uplift.upliftbackend.repository.DonorRepository;
import com.uplift.upliftbackend.repository.EngagementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EngagementService {

    private final EngagementRepository engagementRepository;
    private final DonorRepository donorRepository;

    public EngagementService(
            EngagementRepository engagementRepository,
            DonorRepository donorRepository) {

        this.engagementRepository = engagementRepository;
        this.donorRepository = donorRepository;
    }

    public List<Engagement> getAllEngagements() {
        return engagementRepository.findAll();
    }

    public Engagement createEngagement(EngagementRequest request) {

        Donor donor = donorRepository.findById(request.getDonorId())
                .orElseThrow(() -> new RuntimeException("Donor not found"));

        Engagement engagement = new Engagement();

        engagement.setDonor(donor);
        engagement.setActivityType(request.getActivityType());
        engagement.setCampaignName(request.getCampaignName());
        engagement.setEngagementDate(request.getEngagementDate());
        engagement.setStatus(request.getStatus());
        engagement.setNotes(request.getNotes());

        return engagementRepository.save(engagement);
    }
}
