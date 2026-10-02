package com.uplift.upliftbackend.repository;

import com.uplift.upliftbackend.entity.ContributionRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContributionRequestRepository
        extends JpaRepository<ContributionRequest, Long> {

    List<ContributionRequest> findByDonorDonorId(Long donorId);
}