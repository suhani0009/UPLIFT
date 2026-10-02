package com.uplift.upliftbackend.repository;

import com.uplift.upliftbackend.entity.Engagement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EngagementRepository extends JpaRepository<Engagement, Long> {

    List<Engagement> findByDonorDonorId(Long donorId);
}
