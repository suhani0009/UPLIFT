package com.uplift.upliftbackend.service;

import com.uplift.upliftbackend.dto.DashboardSummary;
import com.uplift.upliftbackend.repository.DonationRepository;
import com.uplift.upliftbackend.repository.DonorRepository;
import com.uplift.upliftbackend.repository.PaymentTransactionRepository;
import org.springframework.stereotype.Service;
import com.uplift.upliftbackend.dto.RecentDonationSummary;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


@Service
public class DashboardService {

    private final DonorRepository donorRepository;
    private final DonationRepository donationRepository;
    private final PaymentTransactionRepository paymentTransactionRepository;

    public DashboardService(
            DonorRepository donorRepository,
            DonationRepository donationRepository,
            PaymentTransactionRepository paymentTransactionRepository) {

        this.donorRepository = donorRepository;
        this.donationRepository = donationRepository;
        this.paymentTransactionRepository = paymentTransactionRepository;
    }

    public DashboardSummary getSummary() {

        long totalDonors = donorRepository.count();
        long totalDonations = donationRepository.count();
        long totalTransactions = paymentTransactionRepository.count();

        BigDecimal totalDonationAmount =
                donationRepository.findAll()
                        .stream()
                        .map(donation -> donation.getAmount())
                        .filter(amount -> amount != null)
                        .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new DashboardSummary(
                totalDonors,
                totalDonations,
                totalDonationAmount,
                totalTransactions
        );
    }
    public Map<String, BigDecimal> getDonationTotalsByCategory() {

        List<Object[]> results =
                donationRepository.getDonationTotalsByCategory();

        Map<String, BigDecimal> categoryTotals =
                new LinkedHashMap<>();

        for (Object[] row : results) {

            String category = (String) row[0];
            BigDecimal total = (BigDecimal) row[1];

            categoryTotals.put(category, total);
        }

        return categoryTotals;
    }
    public List<RecentDonationSummary> getRecentDonations() {

        return donationRepository.findTop5ByOrderByDonationDateDesc()
                .stream()
                .map(donation -> new RecentDonationSummary(
                        donation.getDonor().getName(),
                        donation.getAmount(),
                        donation.getDonationCategory(),
                        donation.getDonationDate(),
                        donation.getPaymentMethod(),
                        donation.getStatus()
                ))
                .toList();
    }
}
