package com.uplift.upliftbackend.service;

import com.uplift.upliftbackend.dto.PaymentTransactionRequest;
import com.uplift.upliftbackend.entity.Donation;
import com.uplift.upliftbackend.entity.PaymentTransaction;
import com.uplift.upliftbackend.repository.DonationRepository;
import com.uplift.upliftbackend.repository.PaymentTransactionRepository;
import com.uplift.upliftbackend.dto.TransactionStatusRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentTransactionService {

    private final PaymentTransactionRepository paymentTransactionRepository;
    private final DonationRepository donationRepository;

    public PaymentTransactionService(
            PaymentTransactionRepository paymentTransactionRepository,
            DonationRepository donationRepository) {

        this.paymentTransactionRepository = paymentTransactionRepository;
        this.donationRepository = donationRepository;
    }

    public List<PaymentTransaction> getAllTransactions() {
        return paymentTransactionRepository.findAll();
    }

    public PaymentTransaction getTransactionById(Long id) {
        return paymentTransactionRepository.findById(id).orElse(null);
    }

    public PaymentTransaction createTransaction(PaymentTransactionRequest request) {

        Donation donation = donationRepository.findById(request.getDonationId())
                .orElseThrow(() -> new RuntimeException("Donation not found"));

        PaymentTransaction transaction = new PaymentTransaction();

        transaction.setDonation(donation);
        transaction.setGatewayReference(request.getGatewayReference());
        transaction.setAmount(request.getAmount());
        transaction.setTransactionDate(request.getTransactionDate());
        transaction.setPaymentStatus(request.getPaymentStatus());
        transaction.setVerificationStatus(request.getVerificationStatus());
        transaction.setReconciliationStatus(request.getReconciliationStatus());
        transaction.setSource(request.getSource());

        return paymentTransactionRepository.save(transaction);
    }
    public PaymentTransaction updateStatus(
            Long id,
            TransactionStatusRequest request) {

        PaymentTransaction transaction = paymentTransactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        transaction.setVerificationStatus(request.getVerificationStatus());
        transaction.setReconciliationStatus(request.getReconciliationStatus());

        return paymentTransactionRepository.save(transaction);
    }
}
