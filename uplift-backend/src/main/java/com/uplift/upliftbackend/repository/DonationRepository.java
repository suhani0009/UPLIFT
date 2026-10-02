package com.uplift.upliftbackend.repository;

import com.uplift.upliftbackend.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;

public interface DonationRepository extends JpaRepository<Donation, Long> {

    List<Donation> findByDonorDonorId(Long donorId);
    List<Donation> findByPaymentMethod(String paymentMethod);
    List<Donation> findTop5ByOrderByDonationDateDesc();

    Optional<Donation> findByDonorDonorIdAndAmountAndDonationDate(
            Long donorId,
            BigDecimal amount,
            LocalDateTime donationDate
    );
    @Query("""
        SELECT d.donationCategory, SUM(d.amount)
        FROM Donation d
        WHERE d.donationCategory IS NOT NULL
        GROUP BY d.donationCategory
        """)
    List<Object[]> getDonationTotalsByCategory();
}

