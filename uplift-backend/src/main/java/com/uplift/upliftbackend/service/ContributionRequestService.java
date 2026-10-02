package com.uplift.upliftbackend.service;

import com.uplift.upliftbackend.dto.ContributionRequestDTO;
import com.uplift.upliftbackend.entity.Centre;
import com.uplift.upliftbackend.entity.ContributionRequest;
import com.uplift.upliftbackend.entity.Donor;
import com.uplift.upliftbackend.repository.CentreRepository;
import com.uplift.upliftbackend.repository.ContributionRequestRepository;
import com.uplift.upliftbackend.repository.DonorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContributionRequestService {

    private final ContributionRequestRepository contributionRequestRepository;
    private final DonorRepository donorRepository;
    private final CentreRepository centreRepository;

    public ContributionRequestService(
            ContributionRequestRepository contributionRequestRepository,
            DonorRepository donorRepository,
            CentreRepository centreRepository) {

        this.contributionRequestRepository = contributionRequestRepository;
        this.donorRepository = donorRepository;
        this.centreRepository = centreRepository;
    }

    public List<ContributionRequest> getAllRequests() {
        return contributionRequestRepository.findAll();
    }

    public ContributionRequest createRequest(ContributionRequestDTO request) {

        Donor donor = donorRepository.findById(request.getDonorId())
                .orElseThrow(() -> new RuntimeException("Donor not found"));

        Centre centre = null;

        if (request.getCentreId() != null) {
            centre = centreRepository.findById(request.getCentreId())
                    .orElseThrow(() -> new RuntimeException("Centre not found"));
        }

        ContributionRequest contributionRequest = new ContributionRequest();

        contributionRequest.setDonor(donor);
        contributionRequest.setCentre(centre);
        contributionRequest.setCategory(request.getCategory());
        contributionRequest.setQuantity(request.getQuantity());
        contributionRequest.setDescription(request.getDescription());
        contributionRequest.setRemarks(request.getRemarks());
        contributionRequest.setStatus(
                request.getStatus() != null
                        ? request.getStatus()
                        : "PENDING"
        );

        return contributionRequestRepository.save(contributionRequest);
    }
}
