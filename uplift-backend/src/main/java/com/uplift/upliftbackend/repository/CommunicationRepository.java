package com.uplift.upliftbackend.repository;

import com.uplift.upliftbackend.entity.Communication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunicationRepository
        extends JpaRepository<Communication, Long> {

    List<Communication> findByDonorDonorId(Long donorId);
}
