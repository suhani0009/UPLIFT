package com.uplift.upliftbackend.repository;

import com.uplift.upliftbackend.entity.Donor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DonorRepository extends JpaRepository<Donor, Long> {

    Optional<Donor> findByEmail(String email);

    Optional<Donor> findByPhone(String phone);
}
