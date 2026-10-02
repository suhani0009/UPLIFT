package com.uplift.upliftbackend.repository;

import com.uplift.upliftbackend.entity.PaymentTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentTransactionRepository
        extends JpaRepository<PaymentTransaction, Long> {

    Optional<PaymentTransaction> findByDonationDonationId(Long donationId);

    Optional<PaymentTransaction> findByGatewayReference(String gatewayReference);
}